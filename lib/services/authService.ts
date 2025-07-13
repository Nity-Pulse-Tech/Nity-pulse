import { publicApi, authApi } from '../api';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  ApiError 
} from '../types/auth';

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<User> {
    try {
      const response = await publicApi.post<User>('/api/core/register/', userData);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await publicApi.post<AuthResponse>('/api/core/login/', credentials);
      this.setTokens(response.data.access, response.data.refresh);
      this.setUser(response.data.user);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Admin login
   */
  async adminLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await publicApi.post<AuthResponse>('/api/core/admin/login/', credentials);
      this.setTokens(response.data.access, response.data.refresh);
      this.setUser(response.data.user);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    try {
      const response = await authApi.get<User>('/api/core/profile/');
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get admin profile
   */
  async getAdminProfile(): Promise<User> {
    try {
      const response = await authApi.get<User>('/api/core/admin/profile/');
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('access_token');
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Check if current user is admin
   */
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.is_admin || false;
  }

  /**
   * Logout user
   */
  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  /**
   * Set authentication tokens
   */
  private setTokens(access: string, refresh: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  /**
   * Set user data
   */
  private setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): Error {
    if (error.response?.data) {
      const apiError = error.response.data as ApiError;
      const errorMessage = this.formatApiError(apiError);
      return new Error(errorMessage);
    }
    return new Error(error.message || 'An unexpected error occurred');
  }

  /**
   * Format API error messages
   */
  private formatApiError(apiError: ApiError): string {
    const messages: string[] = [];
    
    Object.keys(apiError).forEach(key => {
      const value = apiError[key];
      if (Array.isArray(value)) {
        messages.push(...value);
      } else if (typeof value === 'string') {
        messages.push(value);
      }
    });

    return messages.length > 0 ? messages.join(', ') : 'An error occurred';
  }
}

export const authService = AuthService.getInstance();
export default authService; 