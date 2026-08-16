import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';

export class ResourceController {
  static async getAllResources(req: Request, res: Response): Promise<void> {
    try {
      const { category, search, includeUnpublished } = req.query;

      const where: any = {};
      if (includeUnpublished !== 'true') where.isPublished = true;
      if (category && typeof category === 'string' && category !== 'All') {
        where.category = category;
      }
      if (search && typeof search === 'string') {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { excerpt: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ];
      }

      const resources = await prisma.healthResource.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: resources.length,
        data: resources,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getResourceBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const resource = await prisma.healthResource.findUnique({
        where: { slug },
      });

      if (!resource) {
        res.status(404).json({ success: false, message: 'Article not found.' });
        return;
      }

      res.status(200).json({
        success: true,
        data: resource,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createResource(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const resource = await prisma.healthResource.create({
        data: req.body,
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'CREATE_RESOURCE',
        entityType: 'HealthResource',
        entityId: resource.id,
        details: { title: resource.title, slug: resource.slug },
      });

      res.status(201).json({
        success: true,
        message: 'Health resource published successfully.',
        data: resource,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateResource(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const resource = await prisma.healthResource.update({
        where: { id },
        data: req.body,
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'UPDATE_RESOURCE',
        entityType: 'HealthResource',
        entityId: id,
      });

      res.status(200).json({
        success: true,
        message: 'Health resource updated successfully.',
        data: resource,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteResource(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.healthResource.delete({ where: { id } });

      await logAudit({
        userId: req.user?.userId,
        action: 'DELETE_RESOURCE',
        entityType: 'HealthResource',
        entityId: id,
      });

      res.status(200).json({
        success: true,
        message: 'Health resource removed successfully.',
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
