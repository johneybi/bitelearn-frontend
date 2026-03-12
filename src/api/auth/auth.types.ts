// 회원가입
export type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
};

export type SignupResponse = {
  userId: number;
  email: string;
  nickname: string;
};

// 로그인
export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
};

// 토큰 재발급
export type RefreshResponse = {
  accessToken: string;
  expiresIn: number;
};

export type ProviderType = 'LOCAL' | 'KAKAO' | 'GOOGLE';

// 사용자 정보 조회
export type MeResponse = {
  id: number;
  email: string;
  nickname: string;
  providerType: ProviderType;
  isOnboardingCompleted: boolean;
};

export type AuthErrorCode =
  | 'INVALID_INPUT'
  | 'DUPLICATE_EMAIL'
  | 'DUPLICATE_NICKNAME'
  | 'INVALID_CREDENTIALS'
  | 'USER_BLOCKED'
  | 'INVALID_REFRESH_TOKEN'
  | 'EXPIRED_REFRESH_TOKEN';

export type ErrorResponse = {
  code?: AuthErrorCode;
  message?: string;
};
