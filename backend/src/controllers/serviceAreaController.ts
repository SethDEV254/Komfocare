import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';

export class ServiceAreaController {
  static async getPublicAreas(_req: Request, res: Response): Promise<void> {
    try {
      const areas = await prisma.serviceArea.findMany({
        where: { isOperational: true },
        orderBy: { name: 'asc' },
      });

      res.status(200).json({
        success: true,
        count: areas.length,
        data: areas,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAllAreas(_req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const areas = await prisma.serviceArea.findMany({
        orderBy: { name: 'asc' },
      });

      res.status(200).json({
        success: true,
        count: areas.length,
        data: areas,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createArea(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const area = await prisma.serviceArea.create({
        data: req.body,
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'CREATE_SERVICE_AREA',
        entityType: 'ServiceArea',
        entityId: area.id,
      });

      res.status(201).json({
        success: true,
        message: 'Service area created successfully.',
        data: area,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateArea(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const area = await prisma.serviceArea.update({
        where: { id },
        data: req.body,
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'UPDATE_SERVICE_AREA',
        entityType: 'ServiceArea',
        entityId: id,
        details: req.body,
      });

      res.status(200).json({
        success: true,
        message: 'Service area updated successfully.',
        data: area,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteArea(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.serviceArea.delete({ where: { id } });

      await logAudit({
        userId: req.user?.userId,
        action: 'DELETE_SERVICE_AREA',
        entityType: 'ServiceArea',
        entityId: id,
      });

      res.status(200).json({
        success: true,
        message: 'Service area deleted successfully.',
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
