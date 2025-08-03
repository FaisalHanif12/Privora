const API_BASE_URL = 'http://192.168.0.111:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
  error?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  password: string;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials: LoginRequest): Promise<ApiResponse> {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Register user
  async register(userData: RegisterRequest): Promise<ApiResponse> {
    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.makeRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Reset password
  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    return this.makeRequest(`/auth/reset-password/${token}`, {
      method: 'PUT',
      body: JSON.stringify({ password }),
    });
  }

  // Verify email
  async verifyEmail(token: string): Promise<ApiResponse> {
    return this.makeRequest(`/auth/verify-email/${token}`, {
      method: 'GET',
    });
  }

  // Get current user (protected route)
  async getCurrentUser(token: string): Promise<ApiResponse> {
    return this.makeRequest('/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiService = new ApiService();
export type { ApiResponse, ForgotPasswordRequest, LoginRequest, RegisterRequest, ResetPasswordRequest };

