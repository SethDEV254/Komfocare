import { Router } from 'express';
import { ResourceController } from '../controllers/resourceController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';
import { validateBody } from '../middleware/validate';
import { resourceUpsertSchema } from '../validators';

const router = Router();

router.get('/', ResourceController.getAllResources);
router.get('/:slug', ResourceController.getResourceBySlug);

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validateBody(resourceUpsertSchema),
  ResourceController.createResource
);

router.put(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  ResourceController.updateResource
);

router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  ResourceController.deleteResource
);

export default router;
