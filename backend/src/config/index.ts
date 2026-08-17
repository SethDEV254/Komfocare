import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  jwt: {
    secret: process.env.JWT_SECRET || 'komfocare_jwt_secret_key_change_in_production_2026_super_secure',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'komfocare_jwt_refresh_secret_key_2026_super_secure',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  emergencyHotline: process.env.EMERGENCY_HOTLINE || '0792004232',
  supportEmail: process.env.SUPPORT_EMAIL || 'komfocare@gmail.com',
};
