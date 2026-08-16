import { Request, Response } from 'express';
import { prisma } from '../services/prisma';
import { hashPassword, comparePassword } from '../utils/hash';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAudit } from '../middleware/auditLogger';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, email, password, phoneNumber, role, address, emergencyContactName, emergencyContactPhone } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.',
        });
        return;
      }

      const passwordHash = await hashPassword(password);
      const assignedRole = role || 'PATIENT';

      const user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          passwordHash,
          fullName,
          phoneNumber,
          role: assignedRole,
          ...(assignedRole === 'PATIENT' || assignedRole === 'FAMILY_CAREGIVER'
            ? {
                patientProfile: {
                  create: {
                    fullName,
                    phoneNumber: phoneNumber || 'N/A',
                    address: address || 'Nairobi, Kenya',
                    emergencyContactName: emergencyContactName || 'Family Contact',
                    emergencyContactPhone: emergencyContactPhone || phoneNumber || 'N/A',
                  },
                },
              }
            : {}),
        },
      });

      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.fullName,
      };

      const accessToken = signAccessToken(tokenPayload);
      const refreshToken = signRefreshToken(tokenPayload);

      await logAudit({
        userId: user.id,
        action: 'USER_REGISTER',
        entityType: 'User',
        entityId: user.id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.status(201).json({
        success: true,
        message: 'Account created successfully.',
        data: {
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          },
          accessToken,
          refreshToken,
        },
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create account.',
        error: error.message,
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          patientProfile: true,
          professionalProfile: true,
        },
      });

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
        return;
      }

      if (!user.isActive) {
        res.status(403).json({
          success: false,
          message: 'This account has been deactivated. Please contact support.',
        });
        return;
      }

      const isMatch = await comparePassword(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
        return;
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.fullName,
      };

      const accessToken = signAccessToken(tokenPayload);
      const refreshToken = signRefreshToken(tokenPayload);

      await logAudit({
        userId: user.id,
        action: 'USER_LOGIN',
        entityType: 'User',
        entityId: user.id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      res.status(200).json({
        success: true,
        message: 'Login successful.',
        data: {
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            avatarUrl: user.avatarUrl,
            patientId: user.patientProfile?.id,
            professionalId: user.professionalProfile?.id,
          },
          accessToken,
          refreshToken,
        },
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Authentication failed.',
        error: error.message,
      });
    }
  }

  static async me(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          email: true,
          fullName: true,
          phoneNumber: true,
          role: true,
          avatarUrl: true,
          isActive: true,
          lastLoginAt: true,
          patientProfile: {
            select: {
              id: true,
              address: true,
              city: true,
              emergencyContactName: true,
              emergencyContactPhone: true,
            },
          },
          professionalProfile: {
            select: {
              id: true,
              title: true,
              roleTitle: true,
              experienceYears: true,
              isAvailable: true,
              rating: true,
            },
          },
        },
      });

      if (!user) {
        res.status(404).json({ success: false, message: 'User not found.' });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ success: false, message: 'Refresh token is required.' });
        return;
      }

      const payload = verifyRefreshToken(refreshToken);
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user || !user.isActive) {
        res.status(401).json({ success: false, message: 'Invalid session or account deactivated.' });
        return;
      }

      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.fullName,
      };

      const newAccessToken = signAccessToken(tokenPayload);
      const newRefreshToken = signRefreshToken(tokenPayload);

      res.status(200).json({
        success: true,
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid refresh token.' });
    }
  }

  static async demoLogin(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body; // 'ADMIN' | 'HEALTHCARE_PROFESSIONAL' | 'PATIENT'

      let email = 'patient@komfocare.com';
      if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        email = 'admin@komfocare.com';
      } else if (role === 'HEALTHCARE_PROFESSIONAL') {
        email = 'sarah.nurse@komfocare.com';
      }

      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          patientProfile: true,
          professionalProfile: true,
        },
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: `Demo user for ${role} not found. Please run seed script.`,
        });
        return;
      }

      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.fullName,
      };

      const accessToken = signAccessToken(tokenPayload);
      const refreshToken = signRefreshToken(tokenPayload);

      res.status(200).json({
        success: true,
        message: `Logged in as Demo ${user.role}.`,
        data: {
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            avatarUrl: user.avatarUrl,
            patientId: user.patientProfile?.id,
            professionalId: user.professionalProfile?.id,
          },
          accessToken,
          refreshToken,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
