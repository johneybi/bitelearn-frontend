import apiClient from './axios';
import type {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
} from './auth.types';

export async function signup(data: SignupRequest) {
  const response = await apiClient.post<SignupResponse>('/auth/signup', data);
  return response.data;
}

export async function login(data: LoginRequest) {
  const response = await apiClient.post<LoginResponse>('/auth/login', data);
  return response.data;
}

export async function refreshAccessToken() {
  const response = await apiClient.post<RefreshResponse>('/auth/refresh');
  return response.data;
}
