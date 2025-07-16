export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  created: string;
  modified: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface ApiError {
  message?: string;
  email?: string[];
  password?: string[];
  password_confirm?: string[];
  first_name?: string[];
  last_name?: string[];
  [key: string]: string | string[] | undefined;
}