import { Router } from 'express';
import { ServiceAreaController } from '../controllers/serviceAreaController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';
import { validateBody } from '../middleware/validate';
import { serviceAreaUpsertSchema } from '../validators';

const router = Router();

router.get('/public', ServiceAreaController.getPublicAreas);

router.get(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  ServiceAreaController.getAllAreas
);

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validateBody(serviceAreaUpsertSchema),
  ServiceAreaController.createArea
);

router.put(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  ServiceAreaController.updateArea
);

router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  ServiceAreaController.deleteArea
);

export default router;
