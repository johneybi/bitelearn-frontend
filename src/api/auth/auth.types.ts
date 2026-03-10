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

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
};

export type RefreshResponse = {
  accessToken: string;
  expiresIn: number;
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
