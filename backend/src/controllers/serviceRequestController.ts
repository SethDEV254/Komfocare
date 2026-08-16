import { Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { generateReferenceNumber } from '../utils/reference';
import { NotificationService } from '../services/notification';
import { logAudit } from '../middleware/auditLogger';

export class ServiceRequestController {
  static async createRequest(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const referenceNumber = generateReferenceNumber('KC');
      const {
        serviceId,
        patientName,
        patientPhone,
        patientEmail,
        patientDob,
        patientLocation,
        city,
        emergencyContactName,
        emergencyContactPhone,
        careRequirements,
        preferredDate,
        preferredTimeSlot,
        mobilityStatus,
        additionalNotes,
      } = req.body;

      const userId = req.user?.userId || null;

      // Find or create matching patient profile
      let patientId: string | null = null;
      if (userId) {
        const userPatient = await prisma.patient.findUnique({
          where: { userId },
        });
        if (userPatient) {
          patientId = userPatient.id;
        }
      }

      if (!patientId) {
        // Create an unlinked or linked patient entry
        const newPatient = await prisma.patient.create({
          data: {
            userId,
            fullName: patientName,
            phoneNumber: patientPhone,
            email: patientEmail || null,
            dateOfBirth: patientDob ? new Date(patientDob) : null,
            address: patientLocation,
            city: city || 'Nairobi',
            emergencyContactName,
            emergencyContactPhone,
            mobilityNeeds: mobilityStatus,
            medicalHistoryNotes: careRequirements,
          },
        });
        patientId = newPatient.id;
      }

      const request = await prisma.serviceRequest.create({
        data: {
          referenceNumber,
          serviceId,
          userId,
          patientName,
          patientPhone,
          patientEmail: patientEmail || null,
          patientDob: patientDob ? new Date(patientDob) : null,
          patientLocation,
          city: city || 'Nairobi',
          emergencyContactName,
          emergencyContactPhone,
          careRequirements,
          preferredDate: new Date(preferredDate),
          preferredTimeSlot,
          mobilityStatus,
          additionalNotes,
          status: 'REQUESTED',
        },
        include: {
          service: {
            select: { title: true, slug: true, iconName: true, basePrice: true },
          },
        },
      });

      // Notify Admins
      await NotificationService.notifyAdmins(
        'New Home Care Request Received',
        `New booking request #${referenceNumber} for ${request.service.title} submitted by ${patientName}.`,
        `/dashboard/admin?tab=requests&ref=${referenceNumber}`
      );

      // Notify Patient if registered
      if (userId) {
        await NotificationService.send({
          userId,
          title: 'Care Request Received',
          message: `Your request #${referenceNumber} for ${request.service.title} has been received and is under clinical review.`,
          type: 'APPOINTMENT',
        });
      }

      await logAudit({
        userId: userId || undefined,
        action: 'CREATE_SERVICE_REQUEST',
        entityType: 'ServiceRequest',
        entityId: request.id,
        details: { referenceNumber, serviceId, patientName },
      });

      res.status(201).json({
        success: true,
        message: 'Home care request submitted successfully.',
        data: {
          referenceNumber: request.referenceNumber,
          status: request.status,
          serviceTitle: request.service.title,
          preferredDate: request.preferredDate,
          preferredTimeSlot: request.preferredTimeSlot,
          patientName: request.patientName,
          nextSteps: 'Our clinical team will review your request within 2-4 hours to confirm scheduling and assign an appropriate healthcare professional.',
        },
      });
    } catch (error: any) {
      console.error('Service request submission error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getRequestByReference(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { referenceNumber } = req.params;
      const request = await prisma.serviceRequest.findUnique({
        where: { referenceNumber: referenceNumber.toUpperCase() },
        include: {
          service: {
            select: { title: true, slug: true, iconName: true, durationMinutes: true },
          },
          assignedProfessional: {
            select: {
              id: true,
              fullName: true,
              roleTitle: true,
              title: true,
              photoUrl: true,
            },
          },
        },
      });

      if (!request) {
        res.status(404).json({
          success: false,
          message: `Request with reference '${referenceNumber}' not found. Please check your reference code.`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: request,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAllRequests(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { status, search } = req.query;

      const where: any = {};
      if (status && typeof status === 'string' && status !== 'ALL') {
        where.status = status;
      }
      if (search && typeof search === 'string') {
        where.OR = [
          { referenceNumber: { contains: search, mode: 'insensitive' } },
          { patientName: { contains: search, mode: 'insensitive' } },
          { patientPhone: { contains: search, mode: 'insensitive' } },
        ];
      }

      const requests = await prisma.serviceRequest.findMany({
        where,
        include: {
          service: true,
          assignedProfessional: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: requests.length,
        data: requests,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getMyRequests(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const requests = await prisma.serviceRequest.findMany({
        where: { userId: req.user.userId },
        include: {
          service: true,
          assignedProfessional: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: requests.length,
        data: requests,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateRequestStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status, assignedProfessionalId, internalReviewNotes } = req.body;

      const existingRequest = await prisma.serviceRequest.findUnique({
        where: { id },
        include: { service: true },
      });

      if (!existingRequest) {
        res.status(404).json({ success: false, message: 'Service request not found.' });
        return;
      }

      const updatedRequest = await prisma.serviceRequest.update({
        where: { id },
        data: {
          status,
          assignedProfessionalId: assignedProfessionalId !== undefined ? assignedProfessionalId : existingRequest.assignedProfessionalId,
          internalReviewNotes: internalReviewNotes !== undefined ? internalReviewNotes : existingRequest.internalReviewNotes,
        },
        include: {
          service: true,
          assignedProfessional: true,
        },
      });

      // If confirmed or assigned, create an appointment record if not already created
      if ((status === 'CONFIRMED' || status === 'ASSIGNED') && assignedProfessionalId) {
        // Find existing appointment
        const existingAppointment = await prisma.appointment.findFirst({
          where: { serviceRequestId: id },
        });

        if (!existingAppointment) {
          // Find or create patient
          let patient = await prisma.patient.findFirst({
            where: { phoneNumber: existingRequest.patientPhone },
          });

          if (!patient) {
            patient = await prisma.patient.create({
              data: {
                fullName: existingRequest.patientName,
                phoneNumber: existingRequest.patientPhone,
                email: existingRequest.patientEmail,
                address: existingRequest.patientLocation,
                emergencyContactName: existingRequest.emergencyContactName,
                emergencyContactPhone: existingRequest.emergencyContactPhone,
              },
            });
          }

          await prisma.appointment.create({
            data: {
              referenceNumber: `APT-${existingRequest.referenceNumber}`,
              serviceRequestId: id,
              patientId: patient.id,
              professionalId: assignedProfessionalId,
              serviceId: existingRequest.serviceId,
              scheduledDate: existingRequest.preferredDate,
              scheduledTimeSlot: existingRequest.preferredTimeSlot,
              status: 'ASSIGNED',
              locationAddress: existingRequest.patientLocation,
              notes: existingRequest.careRequirements,
            },
          });
        }
      }

      // Notify User
      if (existingRequest.userId) {
        await NotificationService.send({
          userId: existingRequest.userId,
          title: `Booking Request ${status}`,
          message: `Your KomfoCare request #${existingRequest.referenceNumber} status has been updated to ${status}.`,
          type: 'APPOINTMENT',
        });
      }

      await logAudit({
        userId: req.user?.userId,
        action: 'UPDATE_SERVICE_REQUEST_STATUS',
        entityType: 'ServiceRequest',
        entityId: id,
        details: { status, assignedProfessionalId },
      });

      res.status(200).json({
        success: true,
        message: `Request status updated to ${status}.`,
        data: updatedRequest,
      });
    } catch (error: any) {
      console.error('Update request status error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
