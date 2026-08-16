import { Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';

export class AdminController {
  static async getDashboardStats(_req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const [
        totalPatients,
        totalProfessionals,
        pendingRequests,
        todayAppointments,
        completedVisits,
        totalRevenueAgg,
        pendingPaymentsCount,
        allServices,
        recentRequests,
        recentAppointments,
      ] = await Promise.all([
        prisma.patient.count(),
        prisma.healthcareProfessional.count({ where: { isAvailable: true } }),
        prisma.serviceRequest.count({ where: { status: { in: ['REQUESTED', 'PENDING_REVIEW', 'ASSESSMENT'] } } }),
        prisma.appointment.count({
          where: {
            scheduledDate: { gte: today, lt: tomorrow },
            status: { notIn: ['CANCELLED'] },
          },
        }),
        prisma.visitRecord.count(),
        prisma.payment.aggregate({
          where: { status: 'PAID' },
          _sum: { amount: true },
        }),
        prisma.payment.count({ where: { status: 'PENDING' } }),
        prisma.service.findMany({ select: { id: true, title: true, _count: { select: { serviceRequests: true } } } }),
        prisma.serviceRequest.findMany({
          take: 6,
          orderBy: { createdAt: 'desc' },
          include: { service: true },
        }),
        prisma.appointment.findMany({
          take: 6,
          orderBy: { scheduledDate: 'desc' },
          include: { patient: true, professional: true, service: true },
        }),
      ]);

      const serviceDemand = allServices.map((s) => ({
        name: s.title,
        requestsCount: s._count.serviceRequests,
      }));

      res.status(200).json({
        success: true,
        data: {
          metrics: {
            totalPatients,
            activePatients: totalPatients,
            healthcareProfessionals: totalProfessionals,
            pendingRequests,
            todayAppointments,
            completedVisits,
            totalRevenue: totalRevenueAgg._sum.amount || 0,
            pendingPayments: pendingPaymentsCount,
            followUpCases: Math.max(1, Math.round(completedVisits * 0.3)),
          },
          serviceDemand,
          recentRequests,
          recentAppointments,
        },
      });
    } catch (error: any) {
      console.error('Admin stats error:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAuditLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { action, entityType, limit } = req.query;
      const take = limit ? parseInt(limit as string, 10) : 50;

      const where: any = {};
      if (action && typeof action === 'string') where.action = action;
      if (entityType && typeof entityType === 'string') where.entityType = entityType;

      const logs = await prisma.auditLog.findMany({
        where,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { fullName: true, email: true, role: true },
          },
        },
      });

      res.status(200).json({
        success: true,
        count: logs.length,
        data: logs,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAllUsers(_req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          fullName: true,
          phoneNumber: true,
          role: true,
          isActive: true,
          lastLoginAt: true,
          createdAt: true,
          patientProfile: { select: { id: true, address: true } },
          professionalProfile: { select: { id: true, title: true, roleTitle: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { role, isActive } = req.body;

      const user = await prisma.user.update({
        where: { id },
        data: {
          ...(role ? { role } : {}),
          ...(isActive !== undefined ? { isActive } : {}),
        },
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'UPDATE_USER_ROLE_STATUS',
        entityType: 'User',
        entityId: id,
        details: { role, isActive },
      });

      res.status(200).json({
        success: true,
        message: 'User updated successfully.',
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
