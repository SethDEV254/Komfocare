const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface RequestOptions extends RequestInit {
  data?: any;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function apiClient<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { data, headers: customHeaders, ...customConfig } = options;
  const token = localStorage.getItem('komfocare_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    ...customConfig,
    headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
  };

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, config);

    if (response.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh')) {
      // Attempt token refresh
      const refreshToken = localStorage.getItem('komfocare_refresh_token');
      if (refreshToken) {
        try {
          const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });
          const refreshData = await refreshRes.json();
          if (refreshData.success && refreshData.data?.accessToken) {
            localStorage.setItem('komfocare_token', refreshData.data.accessToken);
            if (refreshData.data.refreshToken) {
              localStorage.setItem('komfocare_refresh_token', refreshData.data.refreshToken);
            }
            // Retry original request
            (headers as any)['Authorization'] = `Bearer ${refreshData.data.accessToken}`;
            const retryRes = await fetch(url, { ...config, headers });
            return await retryRes.json();
          }
        } catch {
          localStorage.removeItem('komfocare_token');
          localStorage.removeItem('komfocare_user');
        }
      }
    }

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        responseData.message || `Request failed with status ${response.status}`,
        response.status,
        responseData
      );
    }

    return responseData;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || 'Network error occurred. Check connection.', 0);
  }
}
