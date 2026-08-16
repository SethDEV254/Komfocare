import { Response } from 'express';
import { prisma } from '../services/prisma';
import { AuthenticatedRequest } from '../middleware/auth';
import { PaymentGatewayService } from '../services/payment';
import { logAudit } from '../middleware/auditLogger';

export class PaymentController {
  static async initiatePayment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { patientId, appointmentId, amount, currency, paymentMethod } = req.body;

      const result = await PaymentGatewayService.createInvoiceAndInitiate({
        patientId,
        appointmentId,
        amount: Number(amount),
        currency: currency || 'KES',
        paymentMethod: paymentMethod || 'M-Pesa Express',
      });

      await logAudit({
        userId: req.user?.userId,
        action: 'INITIATE_PAYMENT',
        entityType: 'Invoice',
        entityId: result.invoice.id,
        details: { invoiceNumber: result.invoice.invoiceNumber, amount },
      });

      res.status(201).json({
        success: true,
        message: 'Payment invoice created and ready for checkout.',
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async completePayment(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { invoiceNumber, transactionRef } = req.body;

      const payment = await PaymentGatewayService.completePayment(
        invoiceNumber,
        transactionRef || `MPESA-${Date.now()}`
      );

      await logAudit({
        userId: req.user?.userId,
        action: 'PAYMENT_COMPLETED',
        entityType: 'Payment',
        entityId: payment.id,
        details: { invoiceNumber, transactionRef: payment.transactionRef },
      });

      res.status(200).json({
        success: true,
        message: 'Payment completed successfully.',
        data: payment,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAllPayments(_req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const payments = await prisma.payment.findMany({
        include: {
          patient: true,
          appointment: { include: { service: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: payments.length,
        data: payments,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getMyInvoices(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const patient = await prisma.patient.findUnique({
        where: { userId: req.user.userId },
      });

      if (!patient) {
        res.status(200).json({ success: true, count: 0, data: [] });
        return;
      }

      const invoices = await prisma.invoice.findMany({
        where: { patientId: patient.id },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        count: invoices.length,
        data: invoices,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
