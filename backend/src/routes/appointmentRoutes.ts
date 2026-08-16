import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';
import { validateBody } from '../middleware/validate';
import { createAppointmentSchema } from '../validators';

const router = Router();

router.get('/my', authenticate, AppointmentController.getMyAppointments);

router.get(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN', 'HEALTHCARE_PROFESSIONAL']),
  AppointmentController.getAllAppointments
);

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN', 'HEALTHCARE_PROFESSIONAL']),
  validateBody(createAppointmentSchema),
  AppointmentController.createAppointment
);

router.patch(
  '/:id/status',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN', 'HEALTHCARE_PROFESSIONAL']),
  AppointmentController.updateAppointmentStatus
);

export default router;
