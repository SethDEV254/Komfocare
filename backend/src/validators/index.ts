import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z.string().optional(),
  role: z.enum(['PATIENT', 'FAMILY_CAREGIVER', 'HEALTHCARE_PROFESSIONAL', 'ADMIN', 'SUPER_ADMIN']).optional(),
  address: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createServiceRequestSchema = z.object({
  serviceId: z.string().min(1, 'Service selection is required'),
  patientName: z.string().min(2, 'Patient full name is required'),
  patientPhone: z.string().min(5, 'Valid phone number is required'),
  patientEmail: z.string().email('Valid email is required').optional().or(z.literal('')),
  patientDob: z.string().optional(),
  patientLocation: z.string().min(3, 'Address or residence location is required'),
  city: z.string().default('Nairobi'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(5, 'Emergency contact phone is required'),
  careRequirements: z.string().min(5, 'Please describe care requirements'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTimeSlot: z.string().min(1, 'Preferred time slot is required'),
  mobilityStatus: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export const updateRequestStatusSchema = z.object({
  status: z.enum([
    'REQUESTED',
    'PENDING_REVIEW',
    'ASSESSMENT',
    'CONFIRMED',
    'ASSIGNED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
  ]),
  assignedProfessionalId: z.string().optional().nullable(),
  internalReviewNotes: z.string().optional(),
});

export const createAppointmentSchema = z.object({
  serviceRequestId: z.string().optional(),
  patientId: z.string().min(1, 'Patient ID is required'),
  professionalId: z.string().optional().nullable(),
  serviceId: z.string().min(1, 'Service ID is required'),
  scheduledDate: z.string().min(1, 'Scheduled date is required'),
  scheduledTimeSlot: z.string().min(1, 'Time slot is required'),
  locationAddress: z.string().min(3, 'Location address is required'),
  notes: z.string().optional(),
});

export const recordVisitSchema = z.object({
  appointmentId: z.string().optional(),
  patientId: z.string().min(1, 'Patient ID is required'),
  servicesProvided: z.string().min(3, 'Services provided must be documented'),
  clinicalObservations: z.string().min(3, 'Clinical observations are required'),
  patientResponse: z.string().optional(),
  followUpRecommendation: z.string().optional(),
  privateNotes: z.string().optional(),
  vitalSigns: z
    .object({
      systolicBP: z.number().int().optional(),
      diastolicBP: z.number().int().optional(),
      heartRate: z.number().int().optional(),
      respiratoryRate: z.number().int().optional(),
      spO2: z.number().optional(),
      bloodGlucose: z.number().optional(),
      temperature: z.number().optional(),
      notes: z.string().optional(),
    })
    .optional(),
});

export const recordVitalSignSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required'),
  visitRecordId: z.string().optional(),
  recordedByName: z.string().default('Clinical Staff'),
  systolicBP: z.number().int().optional(),
  diastolicBP: z.number().int().optional(),
  heartRate: z.number().int().optional(),
  respiratoryRate: z.number().int().optional(),
  spO2: z.number().optional(),
  bloodGlucose: z.number().optional(),
  temperature: z.number().optional(),
  notes: z.string().optional(),
});

export const serviceUpsertSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  shortDescription: z.string().min(5),
  fullDescription: z.string().min(10),
  category: z.string().default('Home Care'),
  basePrice: z.number().nonnegative().default(0),
  currency: z.string().default('KES'),
  durationMinutes: z.number().int().positive().default(60),
  iconName: z.string().default('HeartHandshake'),
  imageUrl: z.string().optional(),
  benefits: z.string().optional(),
  includedItems: z.string().optional(),
  faqs: z.string().optional(),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const resourceUpsertSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().min(5),
  content: z.string().min(10),
  category: z.string().default('Home Care'),
  readTimeMinutes: z.number().int().positive().default(5),
  featuredImage: z.string().optional(),
  authorName: z.string().default('KomfoCare Clinical Team'),
  authorRole: z.string().default('Healthcare Editorial Board'),
  tags: z.string().optional(),
  isPublished: z.boolean().default(true),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const testimonialUpsertSchema = z.object({
  name: z.string().min(2),
  roleOrRelationship: z.string().min(2),
  rating: z.number().int().min(1).max(5).default(5),
  content: z.string().min(5),
  location: z.string().default('Nairobi, Kenya'),
  isApproved: z.boolean().default(true),
  isFeatured: z.boolean().default(true),
});

export const serviceAreaUpsertSchema = z.object({
  name: z.string().min(2),
  countyOrRegion: z.string().default('Nairobi Metropolitan'),
  country: z.string().default('Kenya'),
  isOperational: z.boolean().default(true),
  description: z.string().min(5),
  coveragePoints: z.string().optional(),
});
