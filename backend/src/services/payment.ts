import { prisma } from './prisma';
import { generateInvoiceNumber } from '../utils/reference';

export interface InitiatePaymentParams {
  patientId: string;
  appointmentId?: string;
  amount: number;
  currency?: string;
  paymentMethod?: string;
}

export class PaymentGatewayService {
  /**
   * Pluggable abstraction layer for payment providers (e.g. M-Pesa Daraja, Cards, Paystack)
   */
  static async createInvoiceAndInitiate(params: InitiatePaymentParams) {
    const invoiceNumber = generateInvoiceNumber();

    // 1. Create Invoice record
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        patientId: params.patientId,
        amount: params.amount,
        currency: params.currency || 'KES',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        status: 'Unpaid',
        itemsJson: JSON.stringify([
          {
            description: 'KomfoCare Professional Home Healthcare Visit',
            amount: params.amount,
          },
        ]),
      },
    });

    // 2. Create Payment intent
    const payment = await prisma.payment.create({
      data: {
        invoiceNumber,
        appointmentId: params.appointmentId,
        patientId: params.patientId,
        amount: params.amount,
        currency: params.currency || 'KES',
        status: 'PENDING',
        paymentMethod: params.paymentMethod || 'M-Pesa / Card',
        transactionRef: `TXN-${Date.now()}`,
        receiptUrl: `/receipts/${invoiceNumber}.pdf`,
      },
    });

    return {
      invoice,
      payment,
      instructions: `Please complete payment for Invoice #${invoiceNumber} via M-Pesa Paybill / Card checkout.`,
    };
  }

  static async completePayment(invoiceNumber: string, transactionRef: string) {
    const payment = await prisma.payment.update({
      where: { invoiceNumber },
      data: {
        status: 'PAID',
        transactionRef,
        paidAt: new Date(),
      },
    });

    await prisma.invoice.update({
      where: { invoiceNumber },
      data: {
        status: 'Paid',
      },
    });

    return payment;
  }
}
