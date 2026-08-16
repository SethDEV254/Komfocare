export type Role = 'PATIENT' | 'FAMILY_CAREGIVER' | 'HEALTHCARE_PROFESSIONAL' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: Role;
  avatarUrl?: string;
  isActive: boolean;
  patientId?: string;
  professionalId?: string;
}

export interface Patient {
  id: string;
  userId?: string;
  fullName: string;
  dateOfBirth?: string;
  gender?: string;
  phoneNumber: string;
  email?: string;
  address: string;
  city: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation?: string;
  medicalHistoryNotes?: string;
  knownAllergies?: string;
  mobilityNeeds?: string;
  appointments?: Appointment[];
  carePlans?: CarePlan[];
  visitRecords?: VisitRecord[];
  vitalSigns?: VitalSign[];
}

export interface HealthcareProfessional {
  id: string;
  userId: string;
  title: string;
  fullName: string;
  roleTitle: string;
  qualifications: string;
  areasOfPractice: string;
  experienceYears: number;
  bio?: string;
  licenseNumber?: string;
  isPublic: boolean;
  isAvailable: boolean;
  rating: number;
  totalVisits: number;
  photoUrl?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  basePrice: number;
  currency: string;
  durationMinutes: number;
  iconName: string;
  imageUrl?: string;
  benefits?: string | string[];
  includedItems?: string | string[];
  faqs?: string | Array<{ question: string; answer: string }>;
  isActive: boolean;
  displayOrder: number;
}

export type RequestStatus =
  | 'REQUESTED'
  | 'PENDING_REVIEW'
  | 'ASSESSMENT'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface ServiceRequest {
  id: string;
  referenceNumber: string;
  serviceId: string;
  service?: Service;
  userId?: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  patientDob?: string;
  patientLocation: string;
  city: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  careRequirements: string;
  preferredDate: string;
  preferredTimeSlot: string;
  mobilityStatus?: string;
  additionalNotes?: string;
  status: RequestStatus;
  assignedProfessionalId?: string;
  assignedProfessional?: HealthcareProfessional;
  internalReviewNotes?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  serviceRequestId?: string;
  patientId: string;
  patient?: Patient;
  professionalId?: string;
  professional?: HealthcareProfessional;
  serviceId: string;
  service?: Service;
  scheduledDate: string;
  scheduledTimeSlot: string;
  status: RequestStatus;
  locationAddress: string;
  notes?: string;
  visitRecord?: VisitRecord;
}

export interface CarePlan {
  id: string;
  patientId: string;
  title: string;
  goals: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: string;
  notes?: string;
}

export interface VisitRecord {
  id: string;
  appointmentId?: string;
  patientId: string;
  patient?: Patient;
  professionalId: string;
  professional?: HealthcareProfessional;
  visitDate: string;
  servicesProvided: string;
  clinicalObservations: string;
  patientResponse?: string;
  followUpRecommendation?: string;
  privateNotes?: string;
  vitalSigns?: VitalSign[];
}

export interface VitalSign {
  id: string;
  patientId: string;
  visitRecordId?: string;
  recordedByName: string;
  systolicBP?: number;
  diastolicBP?: number;
  heartRate?: number;
  respiratoryRate?: number;
  spO2?: number;
  bloodGlucose?: number;
  temperature?: number;
  notes?: string;
  recordedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  roleOrRelationship: string;
  rating: number;
  content: string;
  location: string;
  isApproved: boolean;
  isFeatured: boolean;
}

export interface HealthResource {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTimeMinutes: number;
  featuredImage?: string;
  authorName: string;
  authorRole: string;
  tags?: string;
  isPublished: boolean;
  publishedAt: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  countyOrRegion: string;
  country: string;
  isOperational: boolean;
  description: string;
  coveragePoints?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'APPOINTMENT' | 'VISIT' | 'PAYMENT' | 'ALERT';
  isRead: boolean;
  link?: string;
  createdAt: string;
}
