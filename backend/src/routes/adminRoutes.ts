import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();

// Protect all admin routes
router.use(authenticate, authorize(['ADMIN', 'SUPER_ADMIN']));

router.get('/stats', AdminController.getDashboardStats);
router.get('/audit-logs', AdminController.getAuditLogs);
router.get('/users', AdminController.getAllUsers);
router.patch('/users/:id', AdminController.updateUser);

export default router;
