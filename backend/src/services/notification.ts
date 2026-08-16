import { prisma } from './prisma';

export interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type?: 'INFO' | 'APPOINTMENT' | 'VISIT' | 'PAYMENT' | 'ALERT';
  link?: string;
}

export class NotificationService {
  static async send(params: CreateNotificationParams) {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId: params.userId,
          title: params.title,
          message: params.message,
          type: params.type || 'INFO',
          link: params.link,
        },
      });

      // Notification channels (Extensible for SMS / WhatsApp / Email)
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Notification dispatched to User ${params.userId}] ${params.title}: ${params.message}`);
      }

      return notification;
    } catch (error) {
      console.error('Failed to create in-app notification:', error);
      return null;
    }
  }

  static async notifyAdmins(title: string, message: string, link?: string) {
    try {
      const admins = await prisma.user.findMany({
        where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
        select: { id: true },
      });

      for (const admin of admins) {
        await this.send({
          userId: admin.id,
          title,
          message,
          type: 'ALERT',
          link,
        });
      }
    } catch (error) {
      console.error('Failed to notify admins:', error);
    }
  }
}
