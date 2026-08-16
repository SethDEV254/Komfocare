import { prisma } from '../services/prisma';

export interface LogAuditParams {
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, any> | string;
  ipAddress?: string;
  userAgent?: string;
}

export const logAudit = async (params: LogAuditParams): Promise<void> => {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        details: typeof params.details === 'object' ? JSON.stringify(params.details) : params.details,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
      },
    });
  } catch (error) {
    console.error('Failed to record audit log:', error);
  }
};
