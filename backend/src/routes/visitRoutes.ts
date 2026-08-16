import { Router } from 'express';
import { VisitController } from '../controllers/visitController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';
import { validateBody } from '../middleware/validate';
import { recordVisitSchema } from '../validators';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN', 'HEALTHCARE_PROFESSIONAL']),
  validateBody(recordVisitSchema),
  VisitController.recordVisit
);

router.get('/patient/:patientId', authenticate, VisitController.getVisitsByPatient);
router.get('/:id', authenticate, VisitController.getVisitById);

export default router;
