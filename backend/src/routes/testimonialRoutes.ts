import { Router } from 'express';
import { TestimonialController } from '../controllers/testimonialController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';
import { validateBody } from '../middleware/validate';
import { testimonialUpsertSchema } from '../validators';

const router = Router();

router.get('/public', TestimonialController.getPublicTestimonials);

router.get(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  TestimonialController.getAllTestimonials
);

router.post(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validateBody(testimonialUpsertSchema),
  TestimonialController.createTestimonial
);

router.put(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  TestimonialController.updateTestimonial
);

router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  TestimonialController.deleteTestimonial
);

export default router;
