import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';

const defaultServiceAreas = [
  {
    id: 'area-1',
    name: 'Westlands & Parklands',
    countyOrRegion: 'Nairobi County',
    country: 'Kenya',
    isOperational: true,
    description: 'Full home nursing, post-op care, and senior assisted living coverage.',
  },
  {
    id: 'area-2',
    name: 'Kilimani, Lavington & Kileleshwa',
    countyOrRegion: 'Nairobi County',
    country: 'Kenya',
    isOperational: true,
    description: 'Comprehensive 24/7 home nursing dispatch and clinical monitoring.',
  },
  {
    id: 'area-3',
    name: 'Karen, Langata & Runda',
    countyOrRegion: 'Nairobi Metropolitan',
    country: 'Kenya',
    isOperational: true,
    description: 'Dedicated residential nursing and home health escort services.',
  },
];

export class ServiceAreaController {
  static async getPublicAreas(_req: Request, res: Response): Promise<void> {
    try {
      let areas = [];
      try {
        areas = await prisma.serviceArea.findMany({
          where: { isOperational: true },
          orderBy: { name: 'asc' },
        });
      } catch (dbErr) {
        console.warn('⚠️ Service area database offline or unseeded. Serving resilient service areas.');
      }

      if (!areas || areas.length === 0) {
        areas = defaultServiceAreas;
      }

      res.status(200).json({
        success: true,
        count: areas.length,
        data: areas,
      });
    } catch (error: any) {
      res.status(200).json({ success: true, count: defaultServiceAreas.length, data: defaultServiceAreas });
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
