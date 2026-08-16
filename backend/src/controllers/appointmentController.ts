import { Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { generateReferenceNumber } from '../utils/reference';
import { logAudit } from '../middleware/auditLogger';
import { NotificationService } from '../services/notification';

export class AppointmentController {
  static async getAllAppointments(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { status, date, professionalId, patientId } = req.query;

      const where: any = {};
      if (status && typeof status === 'string') where.status = status;
      if (professionalId && typeof professionalId === 'string') where.professionalId = professionalId;
      if (patientId && typeof patientId === 'string') where.patientId = patientId;
      if (date && typeof date === 'string') {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        where.scheduledDate = { gte: startOfDay, lte: endOfDay };
      }

      const appointments = await prisma.appointment.findMany({
        where,
        include: {
          patient: true,
          professional: true,
          service: true,
          visitRecord: {
            include: { vitalSigns: true },
          },
        },
        orderBy: { scheduledDate: 'asc' },
      });

      res.status(200).json({
        success: true,
        count: appointments.length,
        data: appointments,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getMyAppointments(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      let where: any = {};

      if (req.user.role === 'PATIENT' || req.user.role === 'FAMILY_CAREGIVER') {
        const patient = await prisma.patient.findUnique({
          where: { userId: req.user.userId },
        });
        if (!patient) {
          res.status(200).json({ success: true, count: 0, data: [] });
          return;
        }
        where.patientId = patient.id;
      } else if (req.user.role === 'HEALTHCARE_PROFESSIONAL') {
        const professional = await prisma.healthcareProfessional.findUnique({
          where: { userId: req.user.userId },
        });
        if (!professional) {
          res.status(200).json({ success: true, count: 0, data: [] });
          return;
        }
        where.professionalId = professional.id;
      }

      const appointments = await prisma.appointment.findMany({
        where,
        include: {
          patient: true,
          professional: true,
          service: true,
          visitRecord: {
            include: { vitalSigns: true },
          },
        },
        orderBy: { scheduledDate: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: appointments.length,
        data: appointments,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createAppointment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { patientId, professionalId, serviceId, scheduledDate, scheduledTimeSlot, locationAddress, notes } = req.body;

      // Conflict Check: ensure professional is not double booked at the same date and slot
      if (professionalId) {
        const conflict = await prisma.appointment.findFirst({
          where: {
            professionalId,
            scheduledDate: new Date(scheduledDate),
            scheduledTimeSlot,
            status: { notIn: ['CANCELLED', 'COMPLETED'] },
          },
        });

        if (conflict) {
          res.status(409).json({
            success: false,
            message: 'Scheduling conflict: This healthcare professional is already assigned to a visit at this time slot.',
          });
          return;
        }
      }

      const referenceNumber = generateReferenceNumber('APT');

      const appointment = await prisma.appointment.create({
        data: {
          referenceNumber,
          patientId,
          professionalId: professionalId || null,
          serviceId,
          scheduledDate: new Date(scheduledDate),
          scheduledTimeSlot,
          status: professionalId ? 'ASSIGNED' : 'PENDING_REVIEW',
          locationAddress,
          notes,
        },
        include: {
          patient: true,
          professional: true,
          service: true,
        },
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'CREATE_APPOINTMENT',
        entityType: 'Appointment',
        entityId: appointment.id,
        details: { referenceNumber, scheduledDate, professionalId },
      });

      res.status(201).json({
        success: true,
        message: 'Appointment scheduled successfully.',
        data: appointment,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateAppointmentStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status, professionalId, notes } = req.body;

      const appointment = await prisma.appointment.update({
        where: { id },
        data: {
          ...(status ? { status } : {}),
          ...(professionalId !== undefined ? { professionalId } : {}),
          ...(notes !== undefined ? { notes } : {}),
        },
        include: {
          patient: true,
          professional: true,
          service: true,
        },
      });

      // Update total visits if completed
      if (status === 'COMPLETED' && appointment.professionalId) {
        await prisma.healthcareProfessional.update({
          where: { id: appointment.professionalId },
          data: { totalVisits: { increment: 1 } },
        });
      }

      await logAudit({
        userId: req.user?.userId,
        action: 'UPDATE_APPOINTMENT_STATUS',
        entityType: 'Appointment',
        entityId: id,
        details: { status, professionalId },
      });

      res.status(200).json({
        success: true,
        message: `Appointment status updated to ${status}.`,
        data: appointment,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
