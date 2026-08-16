import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';

export class TestimonialController {
  static async getPublicTestimonials(_req: Request, res: Response): Promise<void> {
    try {
      const testimonials = await prisma.testimonial.findMany({
        where: { isApproved: true },
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      });

      res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAllTestimonials(_req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createTestimonial(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const testimonial = await prisma.testimonial.create({
        data: req.body,
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'CREATE_TESTIMONIAL',
        entityType: 'Testimonial',
        entityId: testimonial.id,
      });

      res.status(201).json({
        success: true,
        message: 'Testimonial submitted successfully.',
        data: testimonial,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateTestimonial(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const testimonial = await prisma.testimonial.update({
        where: { id },
        data: req.body,
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'UPDATE_TESTIMONIAL',
        entityType: 'Testimonial',
        entityId: id,
        details: req.body,
      });

      res.status(200).json({
        success: true,
        message: 'Testimonial updated successfully.',
        data: testimonial,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteTestimonial(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.testimonial.delete({ where: { id } });

      await logAudit({
        userId: req.user?.userId,
        action: 'DELETE_TESTIMONIAL',
        entityType: 'Testimonial',
        entityId: id,
      });

      res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully.',
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
