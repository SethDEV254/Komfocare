import { Router } from 'express';
import { PatientController } from '../controllers/patientController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

router.get('/me', authenticate, PatientController.getMyProfile);

router.get(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN', 'HEALTHCARE_PROFESSIONAL']),
  PatientController.getAllPatients
);

router.get(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN', 'HEALTHCARE_PROFESSIONAL']),
  PatientController.getPatientById
);

router.put(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  PatientController.updatePatient
);

export default router;
