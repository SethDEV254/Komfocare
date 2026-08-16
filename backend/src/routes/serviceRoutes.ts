import { Router } from 'express';
import { ServiceController } from '../controllers/serviceController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';
import { validateBody } from '../middleware/validate';
import { serviceUpsertSchema } from '../validators';

const router = Router();

router.get('/', ServiceController.getAllServices);
router.get('/:slug', ServiceController.getServiceBySlug);

// Admin service management
router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validateBody(serviceUpsertSchema),
  ServiceController.createService
);

router.put(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  ServiceController.updateService
);

router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  ServiceController.deleteService
);

export default router;
