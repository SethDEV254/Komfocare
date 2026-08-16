import { Router } from 'express';
import { ProfessionalController } from '../controllers/professionalController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// Public verified staff showcase
router.get('/public', ProfessionalController.getPublicProfessionals);

// Healthcare professional self profile
router.get('/me', authenticate, ProfessionalController.getMyProfile);

// Admin get all professionals
router.get(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  ProfessionalController.getAllProfessionals
);

// Get single professional
router.get('/:id', ProfessionalController.getProfessionalById);

// Update professional
router.put(
  '/:id',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN', 'HEALTHCARE_PROFESSIONAL']),
  ProfessionalController.updateProfessional
);

export default router;
