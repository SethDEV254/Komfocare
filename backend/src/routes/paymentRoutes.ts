import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

router.get('/my-invoices', authenticate, PaymentController.getMyInvoices);
router.post('/initiate', authenticate, PaymentController.initiatePayment);
router.post('/complete', authenticate, PaymentController.completePayment);

router.get(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  PaymentController.getAllPayments
);

export default router;
