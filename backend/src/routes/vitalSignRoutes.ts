import { Router } from 'express';
import { VitalSignController } from '../controllers/vitalSignController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';
import { validateBody } from '../middleware/validate';
import { recordVitalSignSchema } from '../validators';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN', 'HEALTHCARE_PROFESSIONAL']),
  validateBody(recordVitalSignSchema),
  VitalSignController.recordVitalSign
);

router.get('/patient/:patientId', authenticate, VitalSignController.getPatientVitals);

export default router;
