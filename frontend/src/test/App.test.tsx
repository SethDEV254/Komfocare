import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';

vi.mock('../context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    user: null,
    isLoading: false,
  }),
}));

vi.mock('../layouts/PublicLayout', () => ({
  PublicLayout: () => <main><h1>KomfoCare</h1></main>,
}));

vi.mock('../layouts/DashboardLayout', () => ({
  DashboardLayout: () => <main>Dashboard</main>,
}));

vi.mock('../pages/public/HomePage', () => ({
  HomePage: () => <h2>Home</h2>,
}));

vi.mock('../pages/public/AboutPage', () => ({
  AboutPage: () => <h2>About KomfoCare</h2>,
}));

vi.mock('../pages/public/ServicesPage', () => ({
  ServicesPage: () => <h2>Healthcare Services</h2>,
}));

vi.mock('../pages/public/ServiceDetailPage', () => ({
  ServiceDetailPage: () => <h2>Service Details</h2>,
}));

vi.mock('../pages/public/ProfessionalsPage', () => ({
  ProfessionalsPage: () => <h2>Healthcare Professionals</h2>,
}));

vi.mock('../pages/public/ResourcesPage', () => ({
  ResourcesPage: () => <h2>Resources</h2>,
}));

vi.mock('../pages/public/ResourceDetailPage', () => ({
  ResourceDetailPage: () => <h2>Resource Details</h2>,
}));

vi.mock('../pages/public/ContactPage', () => ({
  ContactPage: () => <h2>Contact KomfoCare</h2>,
}));

vi.mock('../pages/public/BookCarePage', () => ({
  BookCarePage: () => <h2>Book Care</h2>,
}));

vi.mock('../pages/public/RequestServicePage', () => ({
  RequestServicePage: () => <h2>Request Service</h2>,
}));

vi.mock('../pages/public/TrackRequestPage', () => ({
  TrackRequestPage: () => <h2>Track Request</h2>,
}));

vi.mock('../pages/auth/LoginPage', () => ({
  LoginPage: () => <h2>Login</h2>,
}));

vi.mock('../pages/auth/RegisterPage', () => ({
  RegisterPage: () => <h2>Register</h2>,
}));

vi.mock('../pages/dashboard/PatientDashboard', () => ({
  PatientDashboard: () => <h2>Patient Dashboard</h2>,
}));

vi.mock('../pages/dashboard/ProfessionalDashboard', () => ({
  ProfessionalDashboard: () => <h2>Professional Dashboard</h2>,
}));

vi.mock('../pages/dashboard/AdminDashboard', () => ({
  AdminDashboard: () => <h2>Admin Dashboard</h2>,
}));

vi.mock('../pages/public/NotFoundPage', () => ({
  NotFoundPage: () => <h2>Page Not Found</h2>,
}));

describe('KomfoCare application', () => {
  it('renders the application successfully', () => {
    window.history.pushState({}, '', '/');

    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'KomfoCare' })
    ).toBeInTheDocument();
  });
});
