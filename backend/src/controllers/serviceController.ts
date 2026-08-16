import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';

export class ServiceController {
  static async getAllServices(req: Request, res: Response): Promise<void> {
    try {
      const { includeInactive } = req.query;
      const where = includeInactive === 'true' ? {} : { isActive: true };

      const services = await prisma.service.findMany({
        where,
        orderBy: { displayOrder: 'asc' },
      });

      res.status(200).json({
        success: true,
        count: services.length,
        data: services,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getServiceBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const service = await prisma.service.findUnique({
        where: { slug },
      });

      if (!service) {
        res.status(404).json({ success: false, message: 'Service not found.' });
        return;
      }

      res.status(200).json({
        success: true,
        data: service,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createService(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const service = await prisma.service.create({
        data: req.body,
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'CREATE_SERVICE',
        entityType: 'Service',
        entityId: service.id,
        details: { title: service.title, slug: service.slug },
      });

      res.status(201).json({
        success: true,
        message: 'Service created successfully.',
        data: service,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateService(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const service = await prisma.service.update({
        where: { id },
        data: req.body,
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'UPDATE_SERVICE',
        entityType: 'Service',
        entityId: service.id,
        details: req.body,
      });

      res.status(200).json({
        success: true,
        message: 'Service updated successfully.',
        data: service,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteService(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.service.delete({ where: { id } });

      await logAudit({
        userId: req.user?.userId,
        action: 'DELETE_SERVICE',
        entityType: 'Service',
        entityId: id,
      });

      res.status(200).json({
        success: true,
        message: 'Service deleted successfully.',
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
