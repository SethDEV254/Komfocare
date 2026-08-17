import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';

const defaultPublicProfessionals = [
  {
    id: 'shanice-ceo',
    title: 'Founder & CEO',
    fullName: 'Shanice',
    roleTitle: 'Chief Executive Officer / Founder',
    qualifications: 'Healthcare Administration | Home Care Innovation | Patient-Centred Leadership',
    areasOfPractice: 'Strategic Leadership • Home Healthcare Operations • Community Health',
    experienceYears: 10,
    bio: 'Shanice is the visionary founder and CEO of KomfoCare, driving the mission to bring compassionate, hospital-grade healthcare directly into Kenyan homes.',
    isAvailable: true,
    rating: 5.0,
    totalVisits: 350,
    photoUrl: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'prof-sarah',
    title: 'Nurse',
    fullName: 'Nurse Sarah Ombati, RN',
    roleTitle: 'Senior Home Care Lead & Registered Nurse',
    qualifications: 'BSc Nursing (UoN), BLS Certified, Geriatric Care Specialist',
    areasOfPractice: 'Home Nursing • Elderly Care • Chronic Disease Management',
    experienceYears: 9,
    bio: 'Sarah has over 9 years of dedicated clinical nursing experience specializing in personalized geriatric care and in-home chronic illness support.',
    isAvailable: true,
    rating: 4.98,
    totalVisits: 142,
    photoUrl: 'https://images.unsplash.com/photo-1594824813689-d758c5c7d0d0?auto=format&fit=crop&q=80&w=400',
  },
];

export class ProfessionalController {
  static async getPublicProfessionals(_req: Request, res: Response): Promise<void> {
    try {
      let professionals = [];
      try {
        professionals = await prisma.healthcareProfessional.findMany({
          where: { isPublic: true },
          select: {
            id: true,
            title: true,
            fullName: true,
            roleTitle: true,
            qualifications: true,
            areasOfPractice: true,
            experienceYears: true,
            bio: true,
            isAvailable: true,
            rating: true,
            totalVisits: true,
            photoUrl: true,
          },
          orderBy: { experienceYears: 'desc' },
        });
      } catch (dbErr) {
        console.warn('⚠️ Healthcare professional database offline or unseeded. Serving public showcase.');
      }

      if (!professionals || professionals.length === 0) {
        professionals = defaultPublicProfessionals;
      }

      res.status(200).json({
        success: true,
        count: professionals.length,
        data: professionals,
      });
    } catch (error: any) {
      res.status(200).json({ success: true, count: defaultPublicProfessionals.length, data: defaultPublicProfessionals });
    }
  }

  static async getAllProfessionals(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const professionals = await prisma.healthcareProfessional.findMany({
        include: {
          user: {
            select: { email: true, phoneNumber: true, isActive: true },
          },
          appointments: {
            where: { status: { in: ['ASSIGNED', 'IN_PROGRESS'] } },
            include: { patient: true, service: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: professionals.length,
        data: professionals,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getProfessionalById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const professional = await prisma.healthcareProfessional.findUnique({
        where: { id },
        include: {
          user: {
            select: { email: true, phoneNumber: true },
          },
        },
      });

      if (!professional) {
        res.status(404).json({ success: false, message: 'Healthcare professional not found.' });
        return;
      }

      res.status(200).json({
        success: true,
        data: professional,
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

      const professional = await prisma.healthcareProfessional.findUnique({
        where: { userId: req.user.userId },
        include: {
          appointments: {
            include: { patient: true, service: true },
            orderBy: { scheduledDate: 'asc' },
          },
          visitRecords: {
            take: 10,
            orderBy: { visitDate: 'desc' },
            include: { patient: true, vitalSigns: true },
          },
        },
      });

      if (!professional) {
        res.status(404).json({ success: false, message: 'Professional profile not found.' });
        return;
      }

      res.status(200).json({
        success: true,
        data: professional,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateProfessional(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const professional = await prisma.healthcareProfessional.update({
        where: { id },
        data: req.body,
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'UPDATE_PROFESSIONAL',
        entityType: 'HealthcareProfessional',
        entityId: id,
        details: req.body,
      });

      res.status(200).json({
        success: true,
        message: 'Professional profile updated successfully.',
        data: professional,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
