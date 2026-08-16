import { Router } from 'express';
import authRoutes from './authRoutes';
import serviceRoutes from './serviceRoutes';
import serviceRequestRoutes from './serviceRequestRoutes';
import appointmentRoutes from './appointmentRoutes';
import patientRoutes from './patientRoutes';
import professionalRoutes from './professionalRoutes';
import visitRoutes from './visitRoutes';
import vitalSignRoutes from './vitalSignRoutes';
import paymentRoutes from './paymentRoutes';
import resourceRoutes from './resourceRoutes';
import testimonialRoutes from './testimonialRoutes';
import serviceAreaRoutes from './serviceAreaRoutes';
import adminRoutes from './adminRoutes';

const router = Router();

// Health Check Endpoint (Required by Railway & uptime monitors)
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'KomfoCare API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
  });
});

// Mounted Sub-Routers
router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/service-requests', serviceRequestRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/patients', patientRoutes);
router.use('/professionals', professionalRoutes);
router.use('/visits', visitRoutes);
router.use('/vital-signs', vitalSignRoutes);
router.use('/payments', paymentRoutes);
router.use('/resources', resourceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/service-areas', serviceAreaRoutes);
router.use('/admin', adminRoutes);

export default router;
