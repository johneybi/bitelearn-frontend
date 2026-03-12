import apiClient from './axios';
import type {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  MeResponse,
} from './auth.types';

// 회원가입
export async function signup(data: SignupRequest) {
  const response = await apiClient.post<SignupResponse>('/auth/signup', data);
  return response.data;
}

// 로그인
export async function login(data: LoginRequest) {
  const response = await apiClient.post<LoginResponse>('/auth/login', data);
  return response.data;
}

// 토큰 재발급
export async function refreshAccessToken() {
  const response = await apiClient.post<RefreshResponse>('/auth/refresh');
  return response.data;
}

// 로그아웃
export async function logout() {
  await apiClient.post('/auth/logout');
}

// 사용자 정보 조회
export async function getMe() {
  const response = await apiClient.get<MeResponse>('/users/me');
  return response.data;
}

// 온보딩 완료 처리
export async function completeOnboarding() {
  await apiClient.patch('/users/me/onboarding');
}
