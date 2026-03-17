// FE에서 공통으로 사용할 앱 내부 에러 코드
export type AppErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'VALIDATION_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';

type AppErrorOptions = {
  status?: number;
  code?: AppErrorCode;
  raw?: unknown;
};

// API 클라이언트 레벨에서 정제한 공통 에러 객체
export class AppError extends Error {
  status?: number;
  code: AppErrorCode;
  raw?: unknown;

  constructor(message: string, options?: AppErrorOptions) {
    super(message);
    this.name = 'AppError';
    this.status = options?.status;
    this.code = options?.code ?? 'UNKNOWN_ERROR';
    this.raw = options?.raw;
  }
}

// unknown 에러를 AppError로 안전하게 좁히기 위한 타입 가드
export const isAppError = (error: unknown): error is AppError =>
  error instanceof AppError;
