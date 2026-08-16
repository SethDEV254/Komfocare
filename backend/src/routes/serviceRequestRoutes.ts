import { Router } from 'express';
import { ServiceRequestController } from '../controllers/serviceRequestController';
import { authenticate, optionalAuthenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';
import { validateBody } from '../middleware/validate';
import { createServiceRequestSchema, updateRequestStatusSchema } from '../validators';

const router = Router();

// Public / Authenticated intake
router.post(
  '/',
  optionalAuthenticate,
  validateBody(createServiceRequestSchema),
  ServiceRequestController.createRequest
);

// Public track by reference number
router.get('/track/:referenceNumber', ServiceRequestController.getRequestByReference);

// Authenticated user's requests
router.get('/my', authenticate, ServiceRequestController.getMyRequests);

// Admin view all requests
router.get(
  '/',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN', 'HEALTHCARE_PROFESSIONAL']),
  ServiceRequestController.getAllRequests
);

// Admin update request status & assign
router.patch(
  '/:id/status',
  authenticate,
  authorize(['ADMIN', 'SUPER_ADMIN']),
  validateBody(updateRequestStatusSchema),
  ServiceRequestController.updateRequestStatus
);

export default router;
