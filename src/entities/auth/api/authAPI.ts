import api from "@/shared/api/axios";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../model/types";

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/register", data);
  return response.data;
}
