import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { apiClient } from '../api/client';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  demoLogin: (role: Role) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('komfocare_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('komfocare_token');
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMe = async () => {
      const savedToken = localStorage.getItem('komfocare_token');
      if (savedToken) {
        try {
          const res = await apiClient<{ success: boolean; data: User }>('/auth/me');
          if (res.success && res.data) {
            setUser(res.data);
            localStorage.setItem('komfocare_user', JSON.stringify(res.data));
          }
        } catch {
          // Keep cached user or clear if expired
        }
      }
      setIsLoading(false);
    };

    fetchMe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await apiClient<{
        success: boolean;
        data: { user: User; accessToken: string; refreshToken: string };
      }>('/auth/login', {
        data: { email, password },
      });

      if (res.success && res.data) {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        localStorage.setItem('komfocare_user', JSON.stringify(res.data.user));
        localStorage.setItem('komfocare_token', res.data.accessToken);
        localStorage.setItem('komfocare_refresh_token', res.data.refreshToken);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (role: Role) => {
    setIsLoading(true);
    try {
      const res = await apiClient<{
        success: boolean;
        data: { user: User; accessToken: string; refreshToken: string };
      }>('/auth/demo-login', {
        data: { role },
      });

      if (res.success && res.data) {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        localStorage.setItem('komfocare_user', JSON.stringify(res.data.user));
        localStorage.setItem('komfocare_token', res.data.accessToken);
        localStorage.setItem('komfocare_refresh_token', res.data.refreshToken);
      }
    } catch {
      // Fallback local mock user for instant UI testing if backend is temporarily disconnected
      let mockUser: User = {
        id: 'demo-patient-id',
        email: 'patient@komfocare.com',
        fullName: 'Esther Njeri Karanja',
        role: 'PATIENT',
        isActive: true,
      };
      if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        mockUser = {
          id: 'demo-admin-id',
          email: 'admin@komfocare.com',
          fullName: 'Dr. Komfo Admin',
          role: 'SUPER_ADMIN',
          isActive: true,
        };
      } else if (role === 'HEALTHCARE_PROFESSIONAL') {
        mockUser = {
          id: 'demo-nurse-id',
          email: 'sarah.nurse@komfocare.com',
          fullName: 'Nurse Sarah Ombati, RN',
          role: 'HEALTHCARE_PROFESSIONAL',
          isActive: true,
        };
      }
      setUser(mockUser);
      setToken('mock-jwt-token');
      localStorage.setItem('komfocare_user', JSON.stringify(mockUser));
      localStorage.setItem('komfocare_token', 'mock-jwt-token');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: any) => {
    setIsLoading(true);
    try {
      const res = await apiClient<{
        success: boolean;
        data: { user: User; accessToken: string; refreshToken: string };
      }>('/auth/register', {
        data: payload,
      });

      if (res.success && res.data) {
        setUser(res.data.user);
        setToken(res.data.accessToken);
        localStorage.setItem('komfocare_user', JSON.stringify(res.data.user));
        localStorage.setItem('komfocare_token', res.data.accessToken);
        localStorage.setItem('komfocare_refresh_token', res.data.refreshToken);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('komfocare_user');
    localStorage.removeItem('komfocare_token');
    localStorage.removeItem('komfocare_refresh_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        demoLogin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
