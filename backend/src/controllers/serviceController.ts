import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';

const defaultServices = [
  {
    id: 'srv-1',
    slug: 'home-nursing-care',
    title: 'Home Nursing Care',
    shortDescription: 'Professional NCK-registered nursing care tailored to home recovery and continuous patient monitoring.',
    fullDescription: 'Comprehensive home nursing provided by licensed nurses including clinical assessments, wound care, medication administration, and vital signs monitoring.',
    category: 'Nursing Care',
    basePrice: 4500,
    currency: 'KES',
    durationMinutes: 120,
    iconName: 'HeartHandshake',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    displayOrder: 1,
  },
  {
    id: 'srv-2',
    slug: 'elderly-care',
    title: 'Elderly Care',
    shortDescription: 'Dignified companion & assisted living care for seniors in their home environment.',
    fullDescription: 'Tailored senior assistance including mobility support, companionship, routine monitoring, meal preparation guidance, and hygiene assistance.',
    category: 'Senior Support',
    basePrice: 5000,
    currency: 'KES',
    durationMinutes: 180,
    iconName: 'Users',
    imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d1e2729c?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    displayOrder: 2,
  },
  {
    id: 'srv-3',
    slug: 'post-surgery-care',
    title: 'Post-Surgery Care',
    shortDescription: 'Specialized post-operative wound dressing, pain relief monitoring, and infection prevention.',
    fullDescription: 'In-home clinical post-op care focusing on sterile wound management, suture care, surgical drain tracking, and recovery milestones.',
    category: 'Clinical Care',
    basePrice: 6000,
    currency: 'KES',
    durationMinutes: 120,
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    displayOrder: 3,
  },
  {
    id: 'srv-4',
    slug: 'medication-management',
    title: 'Medication Management',
    shortDescription: 'Accurate pill dispensing, IV administration, and prescription tracking by licensed staff.',
    fullDescription: 'Ensuring safe medication compliance, IV fluid management, prescription reconciliation, and dosage tracking for acute and chronic conditions.',
    category: 'Pharmacy & Care',
    basePrice: 3500,
    currency: 'KES',
    durationMinutes: 60,
    iconName: 'Pill',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    displayOrder: 4,
  },
  {
    id: 'srv-5',
    slug: 'palliative-care',
    title: 'Palliative Care',
    shortDescription: 'Compassionate symptom management and comfort care for advanced health conditions.',
    fullDescription: 'Holistic physical, emotional, and pain-management support designed to optimize quality of life for patients and their family caregivers.',
    category: 'Specialized Care',
    basePrice: 7000,
    currency: 'KES',
    durationMinutes: 240,
    iconName: 'Heart',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    displayOrder: 5,
  },
  {
    id: 'srv-6',
    slug: 'patient-escort-services',
    title: 'Patient Escort Services',
    shortDescription: 'Safe, accompanied transportation and clinical chaperone for hospital visits and appointments.',
    fullDescription: 'Professional clinical escort ensuring safe transport, appointment check-ins, medical note advocacy, and comfortable return home.',
    category: 'Escort & Mobility',
    basePrice: 4000,
    currency: 'KES',
    durationMinutes: 180,
    iconName: 'ShieldCheck',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    displayOrder: 6,
  },
  {
    id: 'srv-7',
    slug: 'vital-signs-monitoring',
    title: 'Vital Signs Monitoring',
    shortDescription: 'Routine BP, blood glucose, SpO2, and cardiac rhythm monitoring with digital logs.',
    fullDescription: 'Regular in-home vital signs collection, trend analysis, digital report generation, and immediate alerting for abnormal thresholds.',
    category: 'Diagnostics',
    basePrice: 3000,
    currency: 'KES',
    durationMinutes: 45,
    iconName: 'Stethoscope',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    displayOrder: 7,
  },
  {
    id: 'srv-8',
    slug: 'health-education',
    title: 'Health Education',
    shortDescription: 'Empowering patient & family training for home caregiving, nutrition, and hygiene.',
    fullDescription: 'Structured 1-on-1 counseling and practical hands-on training for family caregivers regarding safe transfers, infection control, and wellness.',
    category: 'Education',
    basePrice: 3500,
    currency: 'KES',
    durationMinutes: 90,
    iconName: 'BookOpen',
    imageUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    displayOrder: 8,
  },
];

export class ServiceController {
  static async getAllServices(req: Request, res: Response): Promise<void> {
    try {
      const { includeInactive } = req.query;
      const where = includeInactive === 'true' ? {} : { isActive: true };

      let services = [];
      try {
        services = await prisma.service.findMany({
          where,
          orderBy: { displayOrder: 'asc' },
        });
      } catch (dbErr) {
        console.warn('⚠️ Service database offline or unseeded. Serving resilient seed catalog.');
      }

      if (!services || services.length === 0) {
        services = defaultServices;
      }

      res.status(200).json({
        success: true,
        count: services.length,
        data: services,
      });
    } catch (error: any) {
      res.status(200).json({ success: true, count: defaultServices.length, data: defaultServices });
    }
  }

  static async getServiceBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      let service = null;

      try {
        service = await prisma.service.findUnique({
          where: { slug },
        });
      } catch (dbErr) {
        // Fallback to default catalog
      }

      if (!service) {
        service = defaultServices.find((s) => s.slug === slug);
      }

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
