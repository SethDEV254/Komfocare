import { Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';

export class VitalSignController {
  static async recordVitalSign(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const {
        patientId,
        visitRecordId,
        recordedByName,
        systolicBP,
        diastolicBP,
        heartRate,
        respiratoryRate,
        spO2,
        bloodGlucose,
        temperature,
        notes,
      } = req.body;

      const vitalSign = await prisma.vitalSign.create({
        data: {
          patientId,
          visitRecordId: visitRecordId || null,
          recordedByName: recordedByName || req.user?.name || 'Care Professional',
          systolicBP: systolicBP ? Number(systolicBP) : null,
          diastolicBP: diastolicBP ? Number(diastolicBP) : null,
          heartRate: heartRate ? Number(heartRate) : null,
          respiratoryRate: respiratoryRate ? Number(respiratoryRate) : null,
          spO2: spO2 ? Number(spO2) : null,
          bloodGlucose: bloodGlucose ? Number(bloodGlucose) : null,
          temperature: temperature ? Number(temperature) : null,
          notes,
        },
      });

      res.status(201).json({
        success: true,
        message: 'Vital signs logged successfully.',
        data: vitalSign,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getPatientVitals(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { patientId } = req.params;

      const vitals = await prisma.vitalSign.findMany({
        where: { patientId },
        orderBy: { recordedAt: 'asc' },
        take: 50,
      });

      res.status(200).json({
        success: true,
        count: vitals.length,
        data: vitals,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
