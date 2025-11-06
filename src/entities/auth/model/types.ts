export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  full_name: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  role: string;
  full_name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    full_name: string;
    role: string;
  } | null;
  loading: boolean;
  error: string | null;
}
