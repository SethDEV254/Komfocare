import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting KomfoCare database seeding...');

  const passwordHash = await bcrypt.hash('admin123', 10);
  const staffPasswordHash = await bcrypt.hash('nurse123', 10);
  const patientPasswordHash = await bcrypt.hash('patient123', 10);

  // 1. Seed Super Admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@komfocare.com' },
    update: {},
    create: {
      email: 'admin@komfocare.com',
      passwordHash,
      fullName: 'Obiero Shanice Auma (Founder & Lead Director)',
      phoneNumber: '0792004232',
      role: 'SUPER_ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    },
  });
  console.log(`✅ Admin created: ${adminUser.email}`);

  // 2. Seed Healthcare Professionals
  const staffProfiles = [
    {
      email: 'sarah.nurse@komfocare.com',
      fullName: 'Nurse Sarah Ombati, RN',
      title: 'Nurse',
      roleTitle: 'Senior Home Care Lead & Registered Nurse',
      qualifications: 'BSc Nursing (UoN), BLS Certified, Geriatric Care Specialist',
      areasOfPractice: 'Home Nursing • Elderly Care • Chronic Disease Management',
      experienceYears: 9,
      bio: 'Sarah has over 9 years of dedicated clinical nursing experience specializing in personalized geriatric care and in-home chronic illness support.',
      licenseNumber: 'NCK/RN/2017-8841',
      rating: 4.98,
      totalVisits: 142,
      photoUrl: 'https://images.unsplash.com/photo-1594824813689-d758c5c7d0d0?auto=format&fit=crop&q=80&w=400',
    },
    {
      email: 'david.kiprop@komfocare.com',
      fullName: 'Nurse David Kiprop, RN',
      title: 'Nurse',
      roleTitle: 'Post-Operative & Wound Care Specialist',
      qualifications: 'Higher Dip Critical Care, Certified Wound Specialist (CWS)',
      areasOfPractice: 'Post-Surgery Care • Complex Wound Dressing • IV Therapy',
      experienceYears: 7,
      bio: 'David brings critical care and advanced surgical recovery expertise straight to patients recovering peacefully in their private home residences.',
      licenseNumber: 'NCK/RN/2019-4512',
      rating: 4.95,
      totalVisits: 98,
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    },
    {
      email: 'evans.mwangi@komfocare.com',
      fullName: 'Dr. Evans Mwangi, CO',
      title: 'Dr.',
      roleTitle: 'Clinical Officer & Medical Assessments Lead',
      qualifications: 'BSc Clinical Medicine, Advanced Cardiac Life Support (ACLS)',
      areasOfPractice: 'Comprehensive Health Assessments • Vital Monitoring • Clinical Reviews',
      experienceYears: 12,
      bio: 'Evans oversees clinical home assessments, coordinating tailored physician-aligned care plans for families and elderly individuals.',
      licenseNumber: 'COC/REG/2014-9912',
      rating: 5.0,
      totalVisits: 215,
      photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    },
    {
      email: 'grace.wanjiku@komfocare.com',
      fullName: 'Grace Wanjiku, PT',
      title: 'Physiotherapist',
      roleTitle: 'Home Physical & Mobility Rehabilitation Specialist',
      qualifications: 'BSc Physiotherapy, Orthopedic Rehabilitation Certified',
      areasOfPractice: 'Post-Stroke Rehab • Mobility Enhancement • Fall Prevention',
      experienceYears: 8,
      bio: 'Grace is dedicated to helping homebound patients regain independence, functional strength, and confident movement safely within their homes.',
      licenseNumber: 'KPA/PT/2018-3310',
      rating: 4.92,
      totalVisits: 110,
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const createdStaffIds: string[] = [];

  for (const staff of staffProfiles) {
    const user = await prisma.user.upsert({
      where: { email: staff.email },
      update: {},
      create: {
        email: staff.email,
        passwordHash: staffPasswordHash,
        fullName: staff.fullName,
        phoneNumber: '+254 711 000 00' + Math.floor(Math.random() * 9),
        role: 'HEALTHCARE_PROFESSIONAL',
        avatarUrl: staff.photoUrl,
      },
    });

    const prof = await prisma.healthcareProfessional.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        fullName: staff.fullName,
        title: staff.title,
        roleTitle: staff.roleTitle,
        qualifications: staff.qualifications,
        areasOfPractice: staff.areasOfPractice,
        experienceYears: staff.experienceYears,
        bio: staff.bio,
        licenseNumber: staff.licenseNumber,
        rating: staff.rating,
        totalVisits: staff.totalVisits,
        photoUrl: staff.photoUrl,
        isPublic: true,
        isAvailable: true,
      },
    });

    createdStaffIds.push(prof.id);
  }
  console.log(`✅ Seeded ${staffProfiles.length} verified healthcare professionals.`);

  // 3. Seed Services (All 8 Core Home Healthcare Services)
  const servicesList = [
    {
      slug: 'home-nursing-care',
      title: 'Home Nursing Care',
      shortDescription: 'Professional clinical nursing support delivered with compassion in the comfort of your home.',
      fullDescription: 'Our licensed registered nurses provide specialized clinical nursing care including wound dressing, catheter management, injection administration, intravenous therapy, post-acute monitoring, and symptom relief directly in your home environment.',
      category: 'Clinical Care',
      basePrice: 4500,
      currency: 'KES',
      durationMinutes: 120,
      iconName: 'HeartPulse',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      benefits: JSON.stringify([
        'Avoid stressful and costly hospital visits for routine clinical care',
        'Direct 1-on-1 attention from qualified registered nurses',
        'Personalized care routines tailored to your doctors recommendations',
        'Comfortable and infection-minimized home environment',
      ]),
      includedItems: JSON.stringify([
        'Comprehensive clinical health assessment',
        'Wound dressing, medication administration, or IV support',
        'Vital signs logging and documentation',
        'Care progress summary sent to patient & doctor',
      ]),
      faqs: JSON.stringify([
        {
          question: 'What qualifications do your home nurses possess?',
          answer: 'All KomfoCare nurses are licensed Registered Nurses (RNs) registered with the Nursing Council with background checks and acute clinical experience.',
        },
        {
          question: 'How quickly can a nurse visit my home?',
          answer: 'Visits can be scheduled on the same day for urgent requests or planned ahead according to your weekly routine.',
        },
      ]),
      isActive: true,
      displayOrder: 1,
    },
    {
      slug: 'elderly-care',
      title: 'Elderly Care',
      shortDescription: 'Compassionate, dignified, and attentive home care tailored specifically for senior loved ones.',
      fullDescription: 'Our elderly care services focus on promoting independence, dignity, companionship, mobility safety, and daily living support for older adults, ensuring peace of mind for their families.',
      category: 'Senior Support',
      basePrice: 3500,
      currency: 'KES',
      durationMinutes: 180,
      iconName: 'HeartHandshake',
      imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
      benefits: JSON.stringify([
        'Promotes dignity, social engagement, and emotional well-being',
        'Fall prevention and assistance with daily mobility',
        'Personal hygiene, nutrition, and hydration support',
        'Regular wellness updates provided to authorized family members',
      ]),
      includedItems: JSON.stringify([
        'Daily living and mobility assistance',
        'Cognitive engagement and companionship',
        'Nutrition and hydration monitoring',
        'Vital signs tracking and safety environment audit',
      ]),
      faqs: JSON.stringify([
        {
          question: 'Can care plans be adjusted as needs change?',
          answer: 'Yes, care plans are periodically reviewed with families and adjusted seamlessly.',
        },
      ]),
      isActive: true,
      displayOrder: 2,
    },
    {
      slug: 'post-surgery-care',
      title: 'Post-Surgery Care',
      shortDescription: 'Comprehensive recovery and rehabilitation support following hospital discharge.',
      fullDescription: 'Recover faster and safer at home after surgical procedures with specialized wound management, pain management adherence, mobility assistance, and early complication prevention.',
      category: 'Recovery',
      basePrice: 5000,
      currency: 'KES',
      durationMinutes: 120,
      iconName: 'Activity',
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      benefits: JSON.stringify([
        'Significantly lowers risk of post-operative hospital readmission',
        'Expert surgical incision and wound care management',
        'Guided gentle mobilization to accelerate physical recovery',
        'Continuous pain monitoring and medication adherence',
      ]),
      includedItems: JSON.stringify([
        'Incision inspection and sterile dressing changes',
        'Drain and catheter management if present',
        'Pain and vital signs monitoring',
        'Discharge instruction adherence coordination',
      ]),
      faqs: JSON.stringify([
        {
          question: 'When should post-surgery home care begin?',
          answer: 'Ideally within 24 hours of hospital discharge, pre-coordinated before discharge.',
        },
      ]),
      isActive: true,
      displayOrder: 3,
    },
    {
      slug: 'medication-management',
      title: 'Medication Management',
      shortDescription: 'Reliable support with prescribed medication routines, schedules, and reminders.',
      fullDescription: 'Ensure accurate medication adherence, prevent missed doses or double dosage, monitor for adverse side-effects, and maintain an organized medication schedule aligned with your prescribing physician.',
      category: 'Wellness & Adherence',
      basePrice: 2800,
      currency: 'KES',
      durationMinutes: 60,
      iconName: 'Pill',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
      benefits: JSON.stringify([
        'Eliminates confusion across multiple daily prescriptions',
        'Prevents dangerous drug-drug interactions and dosage errors',
        'Maintains timely refill schedules and pill organizer setups',
        'Documents compliance logs for treating physicians',
      ]),
      includedItems: JSON.stringify([
        'Medication reconciliation and routine setup',
        'Weekly pill organizer preparation',
        'Side-effect monitoring and physician communication',
        'Digital adherence logging',
      ]),
      faqs: JSON.stringify([
        {
          question: 'Does KomfoCare prescribe medication?',
          answer: 'No. KomfoCare administers and organizes medications strictly prescribed by your licensed medical practitioner.',
        },
      ]),
      isActive: true,
      displayOrder: 4,
    },
    {
      slug: 'palliative-care',
      title: 'Palliative Care',
      shortDescription: 'Comfort, dignity, and quality-of-life focused holistic home care for complex health journeys.',
      fullDescription: 'Compassionate medical, emotional, and physical support designed to optimize quality of life and relieve distress for patients and families managing serious chronic or advanced illnesses.',
      category: 'Specialized Care',
      basePrice: 6000,
      currency: 'KES',
      durationMinutes: 180,
      iconName: 'ShieldCheck',
      imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
      benefits: JSON.stringify([
        'Expert symptom and pain relief tailored to patient comfort',
        'Empathetic emotional support for both patient and family members',
        'Dignity-centered care delivered in warm, familiar surroundings',
        'Coordinated communication with primary treating specialists',
      ]),
      includedItems: JSON.stringify([
        'Holistic comfort and symptom assessment',
        'Gentle hygiene, skin integrity, and positioning care',
        'Family emotional guidance and respite support',
        'Caregiver counseling and coordination',
      ]),
      faqs: [],
      isActive: true,
      displayOrder: 5,
    },
    {
      slug: 'patient-escort',
      title: 'Patient Escort',
      shortDescription: 'Professional bedside-to-appointment accompaniment for hospital visits and therapies.',
      fullDescription: 'Trained healthcare professionals accompany patients safely to doctor consultations, dialysis sessions, physiotherapy, or imaging appointments, taking care of navigation, notes, and comfort.',
      category: 'Mobility & Support',
      basePrice: 3800,
      currency: 'KES',
      durationMinutes: 240,
      iconName: 'Car',
      imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      benefits: JSON.stringify([
        'Safe assisted transfer and clinical supervision throughout transport',
        'Assistance with clinical check-in and doctor note taking',
        'Peace of mind for busy family members who cannot take time off work',
      ]),
      includedItems: [
        'Door-to-door physical support',
        'Appointment chaperone and consultation note recording',
        'Safe return home and post-visit report to family',
      ],
      faqs: [],
      isActive: true,
      displayOrder: 6,
    },
    {
      slug: 'vital-signs-monitoring',
      title: 'Vital Signs Monitoring',
      shortDescription: 'Systematic monitoring of vital parameters by certified clinicians to spot trends early.',
      fullDescription: 'Regular tracking of blood pressure, blood glucose, oxygen saturation (SpO2), heart rhythm, and temperature by certified healthcare staff with digital records accessible to doctors.',
      category: 'Preventive Care',
      basePrice: 2500,
      currency: 'KES',
      durationMinutes: 45,
      iconName: 'Stethoscope',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
      benefits: JSON.stringify([
        'Identifies clinical fluctuations before they become emergencies',
        'Digital historical trend charts for physician consultations',
        'Immediate notification for abnormal clinical readings',
      ]),
      includedItems: JSON.stringify([
        'Multi-parameter vital signs examination',
        'Blood glucose and oxygen saturation analysis',
        'Instant digital record upload to patient portal',
      ]),
      faqs: [],
      isActive: true,
      displayOrder: 7,
    },
    {
      slug: 'health-education',
      title: 'Health Education',
      shortDescription: 'Guidance and practical training for patients and family caregivers.',
      fullDescription: 'Empowering families with hands-on skills in patient lifting, safe transfer techniques, diabetes diet management, hygiene protocols, and early warning signs recognition.',
      category: 'Education & Training',
      basePrice: 3000,
      currency: 'KES',
      durationMinutes: 90,
      iconName: 'GraduationCap',
      imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
      benefits: JSON.stringify([
        'Empowers family members with confidence and competence',
        'Reduces caregiver burnout through efficient techniques',
        'Improves patient safety and home hygiene standards',
      ]),
      includedItems: JSON.stringify([
        '1-on-1 practical caregiver skills session',
        'Personalized caregiving manual and checklist',
        'Q&A session with qualified healthcare educator',
      ]),
      faqs: [],
      isActive: true,
      displayOrder: 8,
    },
  ];

  const createdServices: Record<string, string> = {};
  for (const s of servicesList) {
    const created = await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
    createdServices[s.slug] = created.id;
  }
  console.log(`✅ Seeded ${servicesList.length} core services.`);

  // 4. Seed Demo Patient & Records
  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@komfocare.com' },
    update: {},
    create: {
      email: 'patient@komfocare.com',
      passwordHash: patientPasswordHash,
      fullName: 'Esther Njeri Karanja',
      phoneNumber: '+254 722 345 678',
      role: 'PATIENT',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    },
  });

  const patientProfile = await prisma.patient.upsert({
    where: { userId: patientUser.id },
    update: {},
    create: {
      userId: patientUser.id,
      fullName: 'Esther Njeri Karanja',
      dateOfBirth: new Date('1952-04-14'),
      gender: 'Female',
      phoneNumber: '+254 722 345 678',
      email: 'patient@komfocare.com',
      address: 'House 14, Riverside Drive, Westlands',
      city: 'Nairobi',
      emergencyContactName: 'Samuel Karanja (Son)',
      emergencyContactPhone: '+254 733 987 654',
      emergencyContactRelation: 'Son / Primary Family Caregiver',
      medicalHistoryNotes: 'Hypertension, Mild Osteoarthritis, Post-knee replacement surgery.',
      knownAllergies: 'Penicillin (mild rash)',
      mobilityNeeds: 'Assisted walking frame, requires gentle support with stairs.',
    },
  });
  console.log(`✅ Seeded demo patient profile: ${patientProfile.fullName}`);

  // 5. Seed Care Plan
  await prisma.carePlan.create({
    data: {
      patientId: patientProfile.id,
      title: 'Post-Operative Joint Rehab & Hypertension Monitoring',
      goals: 'Improve knee joint mobility, maintain BP within 125/80 mmHg range, and ensure strict medication compliance.',
      frequency: '2x Weekly Home Visits',
      startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      status: 'Active',
      notes: 'Patient making positive recovery progress. Vital signs stable.',
    },
  });

  // 6. Seed Sample Service Request & Appointment
  const serviceReq = await prisma.serviceRequest.create({
    data: {
      referenceNumber: 'KC-2026-8841',
      serviceId: createdServices['home-nursing-care'] || Object.values(createdServices)[0],
      userId: patientUser.id,
      patientName: 'Esther Njeri Karanja',
      patientPhone: '+254 722 345 678',
      patientEmail: 'patient@komfocare.com',
      patientDob: new Date('1952-04-14'),
      patientLocation: 'House 14, Riverside Drive, Westlands',
      city: 'Nairobi',
      emergencyContactName: 'Samuel Karanja',
      emergencyContactPhone: '+254 733 987 654',
      careRequirements: 'Assistance with surgical wound dressing, physical mobility rehab, and vital signs check.',
      preferredDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      preferredTimeSlot: '10:00 AM - 12:00 PM',
      mobilityStatus: 'Needs walker support',
      status: 'CONFIRMED',
      assignedProfessionalId: createdStaffIds[0],
    },
  });

  const appt = await prisma.appointment.create({
    data: {
      referenceNumber: 'APT-KC-2026-8841',
      serviceRequestId: serviceReq.id,
      patientId: patientProfile.id,
      professionalId: createdStaffIds[0],
      serviceId: createdServices['home-nursing-care'] || Object.values(createdServices)[0],
      scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      scheduledTimeSlot: '10:00 AM - 12:00 PM',
      status: 'ASSIGNED',
      locationAddress: 'House 14, Riverside Drive, Westlands',
      notes: 'Scheduled regular home nursing check & surgical dressing inspection.',
    },
  });

  // 7. Seed Past Visit Record & Vital Signs
  const pastVisit = await prisma.visitRecord.create({
    data: {
      patientId: patientProfile.id,
      professionalId: createdStaffIds[0],
      visitDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      servicesProvided: 'Sterile surgical wound redressing, BP examination, range of motion exercises.',
      clinicalObservations: 'Incision site clean and dry with no erythema or signs of infection. Patient ambulatory with frame.',
      patientResponse: 'Patient expressed feeling comfortable and noted reduced pain levels.',
      followUpRecommendation: 'Continue bi-weekly visits and maintain hydration.',
      privateNotes: 'Family caregiver briefed on nighttime safety precautions.',
    },
  });

  // Vital Signs trend
  const vitalsData = [
    { daysAgo: 14, sys: 138, dia: 88, hr: 78, spo2: 97.5, glu: 6.2, temp: 36.8 },
    { daysAgo: 10, sys: 132, dia: 84, hr: 75, spo2: 98.0, glu: 5.9, temp: 36.6 },
    { daysAgo: 7, sys: 128, dia: 82, hr: 72, spo2: 98.5, glu: 5.7, temp: 36.5 },
    { daysAgo: 3, sys: 124, dia: 80, hr: 70, spo2: 99.0, glu: 5.5, temp: 36.6 },
  ];

  for (const v of vitalsData) {
    await prisma.vitalSign.create({
      data: {
        patientId: patientProfile.id,
        visitRecordId: pastVisit.id,
        recordedByName: 'Nurse Sarah Ombati, RN',
        systolicBP: v.sys,
        diastolicBP: v.dia,
        heartRate: v.hr,
        respiratoryRate: 16,
        spO2: v.spo2,
        bloodGlucose: v.glu,
        temperature: v.temp,
        notes: 'Routine clinical measurement.',
        recordedAt: new Date(Date.now() - v.daysAgo * 24 * 60 * 60 * 1000),
      },
    });
  }

  // 8. Seed Testimonials
  const testimonials = [
    {
      name: 'Catherine Mwangi',
      roleOrRelationship: 'Daughter of Elderly Client',
      rating: 5,
      content: 'KomfoCare has brought immense peace of mind to our family. Nurse Sarah visits my 82-year-old mother twice a week with such kindness and professionalism. We receive instant updates after every visit.',
      location: 'Kilimani, Nairobi',
      isApproved: true,
      isFeatured: true,
    },
    {
      name: 'James Omondi',
      roleOrRelationship: 'Post-Surgery Patient',
      rating: 5,
      content: 'After my knee replacement, traveling to the hospital every 3 days for dressing was daunting. KomfoCare arranged for Nurse David to come home. My recovery was smooth, comfortable, and infection-free.',
      location: 'Westlands, Nairobi',
      isApproved: true,
      isFeatured: true,
    },
    {
      name: 'Grace & Anthony Njuguna',
      roleOrRelationship: 'Family Caregivers',
      rating: 5,
      content: 'The booking process was seamless, and the caregiver education session taught us how to safely assist our father with mobility. Truly a world-class home healthcare platform.',
      location: 'Karen, Nairobi',
      isApproved: true,
      isFeatured: true,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✅ Seeded ${testimonials.length} database-driven testimonials.`);

  // 9. Seed Health Resources (Blog Articles)
  const articles = [
    {
      slug: 'preparing-home-for-post-surgery-recovery',
      title: 'How to Prepare Your Home for Smooth Post-Surgery Recovery',
      excerpt: 'Essential practical steps and safety modifications to ensure a comfortable, safe, and complication-free recovery at home after hospital discharge.',
      content: `### Preparing Your Home for Recovery\n\nReturning home after surgery is a comforting milestone, but an unprepared living environment can present unnecessary hazards. Here is our clinical checklist for home readiness:\n\n1. **Clear Walking Paths**: Remove loose carpets, extension cords, and small obstacles that could cause trips.\n2. **Optimize Sleeping Arrangements**: Set up your bed on the ground floor if possible to eliminate stair climbing during early recovery days.\n3. **Stock Medical & Hygiene Supplies**: Have prescribed gauze, sterile dressings, and antiseptic solutions ready.\n4. **Schedule Professional Nursing**: Having a dedicated home nurse visit within 24-48 hours ensures surgical incisions are inspected with clinical precision.`,
      category: 'Recovery',
      readTimeMinutes: 5,
      featuredImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      authorName: 'Dr. Evans Mwangi, CO',
      authorRole: 'Clinical Operations Lead',
      tags: JSON.stringify(['Post Surgery', 'Home Health', 'Patient Safety']),
      isPublished: true,
      metaTitle: 'Preparing Your Home for Post-Surgery Recovery | KomfoCare',
      metaDescription: 'Clinical guidance on organizing a safe home recovery environment following surgery.',
    },
    {
      slug: 'understanding-blood-pressure-trends-at-home',
      title: 'Understanding Blood Pressure Trends: Why Regular Home Checks Matter',
      excerpt: 'Learn how consistent home vital signs monitoring helps identify hypertension patterns and protects long-term cardiovascular health.',
      content: `### Why Routine Home Monitoring Matters\n\nBlood pressure fluctuates throughout the day due to physical activity, stress, and hydration. A single measurement in a busy clinic can occasionally be elevated due to 'white-coat effect'.\n\n* **Morning Checks**: Take measurements before morning medications and breakfast.\n* **Rest Period**: Sit quietly for 5 minutes prior to measuring.\n* **Digital Logging**: Recording readings helps your physician adjust therapy accurately without guesswork.`,
      category: 'Preventive Healthcare',
      readTimeMinutes: 4,
      featuredImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
      authorName: 'Nurse Sarah Ombati, RN',
      authorRole: 'Senior Home Care Lead',
      tags: JSON.stringify(['Blood Pressure', 'Hypertension', 'Vital Signs']),
      isPublished: true,
      metaTitle: 'Understanding Blood Pressure Trends at Home | KomfoCare',
      metaDescription: 'Why consistent home vital signs logging improves clinical outcomes.',
    },
    {
      slug: 'supporting-elderly-loved-ones-with-dignity',
      title: 'Caring for Aging Parents: Balancing Independence and Safety',
      excerpt: 'Practical advice on supporting senior family members with daily routines while respecting their dignity and autonomy.',
      content: `### Preserving Dignity in Elder Care\n\nAs our parents age, finding the balance between keeping them safe and honoring their personal independence is one of the most loving yet challenging responsibilities.\n\n* Involve them in every care decision.\n* Focus on gentle mobility exercises to prevent falls.\n* Ensure structured medication routines to prevent accidental double-dosing.\n* Bring in qualified professional home caregivers to alleviate family burnout.`,
      category: 'Elderly Care',
      readTimeMinutes: 6,
      featuredImage: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=800',
      authorName: 'Mary Achieng',
      authorRole: 'Palliative Care Specialist',
      tags: JSON.stringify(['Elderly Care', 'Senior Health', 'Family Caregiving']),
      isPublished: true,
      metaTitle: 'Supporting Aging Parents with Dignity | KomfoCare',
      metaDescription: 'Compassionate guidance for family caregivers managing senior care.',
    },
    {
      slug: 'clinical-nutrition-and-wellness-guide',
      title: 'Clinical Nutrition & Daily Vitality: Fueling Faster Recovery at Home',
      excerpt: 'How tailored meal plans, antioxidant-rich smoothies, hydration schedules, and nutrient timing support post-acute wound healing and energy levels.',
      content: `### Nutrition as a Clinical Foundation for Healing\n\nNutritional support is pivotal for cellular repair and immune resilience during home recovery:\n\n* **Protein Adequacy**: Essential for tissue regeneration and surgical wound closure.\n* **Micronutrient & Vitamin Protocols**: Vitamins C and Zinc promote collagen synthesis, while Omega-3 fatty acids mitigate inflammation.\n* **Hydration Scheduling**: Maintaining consistent fluid intake prevents complications and supports renal filtration.`,
      category: 'Nutrition & Wellness',
      readTimeMinutes: 5,
      featuredImage: '/images/nutrition-wellness.jpg',
      authorName: 'Nurse Faith Wanjiru, RN',
      authorRole: 'Nutrition & Home Health Clinician',
      tags: JSON.stringify(['Nutrition', 'Recovery Diet', 'Wellness']),
      isPublished: true,
      metaTitle: 'Clinical Nutrition & Daily Vitality | KomfoCare',
      metaDescription: 'How clinical nutrition accelerates healing at home.',
    },
    {
      slug: 'holistic-home-healthcare-mind-body-recovery',
      title: 'Holistic Home Care: Integrating Medical Science, Gentle Movement & Peace of Mind',
      excerpt: 'A holistic guide to home recovery combining clinical nursing surveillance, customized physiotherapy exercises, and emotional well-being in familiar surroundings.',
      content: `### The Power of Whole-Person Home Healthcare\n\nHome-based healthcare uniquely allows clinicians to address the complete ecosystem of patient well-being:\n\n* **Medical Oversight**: Sterile procedure adherence and continuous biomarker tracking.\n* **Physical Activity & Physiotherapy**: Gentle mobilization, strength building, and assisted stretching in familiar home surroundings.\n* **Emotional Sanctuary**: Healing in the presence of loved ones significantly reduces hospital stress and elevates recovery optimism.`,
      category: 'Holistic Care',
      readTimeMinutes: 6,
      featuredImage: '/images/holistic-health.jpg',
      authorName: 'Dr. Evans Mwangi, CO',
      authorRole: 'Clinical Operations Lead',
      tags: JSON.stringify(['Holistic Health', 'Physiotherapy', 'Home Care']),
      isPublished: true,
      metaTitle: 'Holistic Home Healthcare | KomfoCare',
      metaDescription: 'Integrating medical science, physiotherapy, and nutrition at home.',
    },
  ];

  for (const a of articles) {
    await prisma.healthResource.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }
  console.log(`✅ Seeded ${articles.length} health resources.`);

  // 10. Seed Service Areas
  const serviceAreas = [
    {
      name: 'Westlands & Kilimani',
      countyOrRegion: 'Nairobi Metropolitan',
      country: 'Kenya',
      isOperational: true,
      description: 'Full home nursing, senior care, and rehabilitation coverage across Westlands, Parklands, Kilimani, and Kileleshwa.',
    },
    {
      name: 'Karen & Langata',
      countyOrRegion: 'Nairobi Metropolitan',
      country: 'Kenya',
      isOperational: true,
      description: 'Dedicated clinical staff and home visit teams servicing Karen, Hardy, and Langata areas.',
    },
    {
      name: 'Lavington & Riverside',
      countyOrRegion: 'Nairobi Metropolitan',
      country: 'Kenya',
      isOperational: true,
      description: 'Fast response and scheduled daily visits across Lavington, Riverside Drive, and surrounding suburbs.',
    },
    {
      name: 'Runda, Muthaiga & Gigiri',
      countyOrRegion: 'Nairobi Metropolitan',
      country: 'Kenya',
      isOperational: true,
      description: 'Specialized senior companionship, post-surgery recovery, and patient escort services.',
    },
  ];

  for (const sa of serviceAreas) {
    await prisma.serviceArea.create({ data: sa });
  }
  console.log(`✅ Seeded ${serviceAreas.length} operational service areas.`);

  console.log('🎉 KomfoCare database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
