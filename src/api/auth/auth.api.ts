import apiClient from '@/api/auth/axios';
import type {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  MeResponse,
  UpdateNicknameRequest,
} from './auth.types';

// 회원가입
export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const response = await apiClient.post<SignupResponse>('/auth/signup', data);
  return response.data;
}

// 로그인
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', data);
  return response.data;
}

// 토큰 재발급
export async function refreshAccessToken(): Promise<RefreshResponse> {
  const response = await apiClient.post<RefreshResponse>('/auth/refresh');
  return response.data;
}

// 로그아웃
export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}

// 사용자 정보 조회
export async function getMe(): Promise<MeResponse> {
  const response = await apiClient.get<MeResponse>('/users/me');
  return response.data;
}

// 사용자 닉네임 수정
export async function updateNickname(data: UpdateNicknameRequest): Promise<void> {
  await apiClient.patch('/users/me/nickname', data);
}

// 온보딩 완료 처리
export async function completeOnboarding(): Promise<void> {
  await apiClient.patch('/users/me/onboarding');
}
