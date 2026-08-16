import { Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';
import { NotificationService } from '../services/notification';

export class VisitController {
  static async recordVisit(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const {
        appointmentId,
        patientId,
        servicesProvided,
        clinicalObservations,
        patientResponse,
        followUpRecommendation,
        privateNotes,
        vitalSigns,
      } = req.body;

      let professionalId = req.body.professionalId;
      if (!professionalId && req.user.role === 'HEALTHCARE_PROFESSIONAL') {
        const prof = await prisma.healthcareProfessional.findUnique({
          where: { userId: req.user.userId },
        });
        if (prof) professionalId = prof.id;
      }

      if (!professionalId) {
        const firstProf = await prisma.healthcareProfessional.findFirst();
        professionalId = firstProf?.id || '';
      }

      // 1. Create Visit Record
      const visit = await prisma.visitRecord.create({
        data: {
          appointmentId: appointmentId || null,
          patientId,
          professionalId,
          servicesProvided,
          clinicalObservations,
          patientResponse,
          followUpRecommendation,
          privateNotes,
        },
        include: {
          patient: true,
          professional: true,
        },
      });

      // 2. Attach Vital Signs if provided
      if (vitalSigns && Object.keys(vitalSigns).length > 0) {
        await prisma.vitalSign.create({
          data: {
            patientId,
            visitRecordId: visit.id,
            recordedByName: visit.professional.fullName || req.user.name,
            systolicBP: vitalSigns.systolicBP ? Number(vitalSigns.systolicBP) : null,
            diastolicBP: vitalSigns.diastolicBP ? Number(vitalSigns.diastolicBP) : null,
            heartRate: vitalSigns.heartRate ? Number(vitalSigns.heartRate) : null,
            respiratoryRate: vitalSigns.respiratoryRate ? Number(vitalSigns.respiratoryRate) : null,
            spO2: vitalSigns.spO2 ? Number(vitalSigns.spO2) : null,
            bloodGlucose: vitalSigns.bloodGlucose ? Number(vitalSigns.bloodGlucose) : null,
            temperature: vitalSigns.temperature ? Number(vitalSigns.temperature) : null,
            notes: vitalSigns.notes,
          },
        });
      }

      // 3. Mark appointment as COMPLETED if linked
      if (appointmentId) {
        await prisma.appointment.update({
          where: { id: appointmentId },
          data: { status: 'COMPLETED' },
        });

        await prisma.healthcareProfessional.update({
          where: { id: professionalId },
          data: { totalVisits: { increment: 1 } },
        });
      }

      // 4. Notify patient if linked to a user
      if (visit.patient.userId) {
        await NotificationService.send({
          userId: visit.patient.userId,
          title: 'Home Care Visit Summary Ready',
          message: `Your visit documentation from ${visit.professional.fullName} has been recorded and is available in your patient portal.`,
          type: 'VISIT',
        });
      }

      await logAudit({
        userId: req.user.userId,
        action: 'RECORD_VISIT',
        entityType: 'VisitRecord',
        entityId: visit.id,
        details: { patientId, appointmentId },
      });

      res.status(201).json({
        success: true,
        message: 'Visit documentation recorded successfully.',
        data: visit,
      });
    } catch (error: any) {
      console.error('Visit documentation error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getVisitsByPatient(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { patientId } = req.params;

      const visits = await prisma.visitRecord.findMany({
        where: { patientId },
        include: {
          professional: {
            select: { fullName: true, title: true, roleTitle: true, photoUrl: true },
          },
          vitalSigns: true,
        },
        orderBy: { visitDate: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: visits.length,
        data: visits,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getVisitById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const visit = await prisma.visitRecord.findUnique({
        where: { id },
        include: {
          patient: true,
          professional: true,
          vitalSigns: true,
          appointment: { include: { service: true } },
        },
      });

      if (!visit) {
        res.status(404).json({ success: false, message: 'Visit record not found.' });
        return;
      }

      res.status(200).json({
        success: true,
        data: visit,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
