import { Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';

export class PatientController {
  static async getAllPatients(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { search } = req.query;

      const where: any = {};
      if (search && typeof search === 'string') {
        where.OR = [
          { fullName: { contains: search, mode: 'insensitive' } },
          { phoneNumber: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { id: { contains: search, mode: 'insensitive' } },
        ];
      }

      const patients = await prisma.patient.findMany({
        where,
        include: {
          appointments: {
            take: 3,
            orderBy: { scheduledDate: 'desc' },
            include: { service: true, professional: true },
          },
          carePlans: {
            where: { status: 'Active' },
          },
          vitalSigns: {
            take: 1,
            orderBy: { recordedAt: 'desc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: patients.length,
        data: patients,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getPatientById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const patient = await prisma.patient.findUnique({
        where: { id },
        include: {
          user: {
            select: { id: true, email: true, isActive: true, avatarUrl: true },
          },
          appointments: {
            include: { service: true, professional: true },
            orderBy: { scheduledDate: 'desc' },
          },
          carePlans: {
            orderBy: { createdAt: 'desc' },
          },
          visitRecords: {
            include: { professional: true, vitalSigns: true },
            orderBy: { visitDate: 'desc' },
          },
          vitalSigns: {
            orderBy: { recordedAt: 'desc' },
            take: 20,
          },
          invoices: {
            orderBy: { createdAt: 'desc' },
          },
          payments: {
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!patient) {
        res.status(404).json({ success: false, message: 'Patient not found.' });
        return;
      }

      res.status(200).json({
        success: true,
        data: patient,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getMyProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const patient = await prisma.patient.findUnique({
        where: { userId: req.user.userId },
        include: {
          appointments: {
            include: { service: true, professional: true },
            orderBy: { scheduledDate: 'desc' },
          },
          carePlans: {
            orderBy: { createdAt: 'desc' },
          },
          visitRecords: {
            include: { professional: true, vitalSigns: true },
            orderBy: { visitDate: 'desc' },
          },
          vitalSigns: {
            orderBy: { recordedAt: 'desc' },
            take: 20,
          },
          invoices: {
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!patient) {
        res.status(404).json({ success: false, message: 'Patient profile not found.' });
        return;
      }

      res.status(200).json({
        success: true,
        data: patient,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updatePatient(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await prisma.patient.update({
        where: { id },
        data: req.body,
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'UPDATE_PATIENT',
        entityType: 'Patient',
        entityId: id,
        details: req.body,
      });

      res.status(200).json({
        success: true,
        message: 'Patient profile updated successfully.',
        data: patient,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
