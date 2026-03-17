import axios from 'axios';
import { AppError, type AppErrorCode, isAppError } from './appError';

// 백엔드 에러 응답에 기반한 최소 형태
type ErrorResponseData = {
  message?: string;
};

// 백엔드 message가 없거나, 아예 응답을 해석할 수 없을 때 사용할 기본 문구들
const DEFAULT_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다.';
const NETWORK_ERROR_MESSAGE = '네트워크 연결을 확인해주세요.';
const TIMEOUT_ERROR_MESSAGE =
  '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
const SERVER_ERROR_MESSAGE =
  '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

// status code를 FE 공통 에러 코드로 치환
const STATUS_TO_ERROR_CODE: Record<number, AppErrorCode> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'VALIDATION_ERROR',
};

// 백엔드 응답 본문에서 사용자에게 보여줄 message만 추출
const getMessageFromResponse = (data: unknown) => {
  if (!data || typeof data !== 'object') {
    return undefined;
  }

  const { message } = data as ErrorResponseData;
  return typeof message === 'string' && message.trim() ? message : undefined;
};

// status code를 기준으로 FE 내부 표준 에러 코드로 변환
const getErrorCodeFromStatus = (status?: number): AppErrorCode => {
  if (!status) {
    return 'UNKNOWN_ERROR';
  }

  if (status >= 500) {
    return 'SERVER_ERROR';
  }

  return STATUS_TO_ERROR_CODE[status] ?? 'UNKNOWN_ERROR';
};

// 외부에서 들어오는 모든 에러를 AppError 하나로 통일
export const toAppError = (error: unknown): AppError => {
  // 이미 AppError로 정제된 에러라면 다시 감싸지 않음
  if (isAppError(error)) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseMessage = getMessageFromResponse(error.response?.data);

    // axios timeout은 응답 유무와 별개로 미리 구분
    if (error.code === 'ECONNABORTED') {
      return new AppError(responseMessage ?? TIMEOUT_ERROR_MESSAGE, {
        status,
        code: 'TIMEOUT_ERROR',
        raw: error,
      });
    }

    // 응답 자체가 없으면 네트워크 단절, CORS, 서버 미도달 같은 케이스로 판단
    if (!error.response) {
      return new AppError(NETWORK_ERROR_MESSAGE, {
        code: 'NETWORK_ERROR',
        raw: error,
      });
    }

    const code = getErrorCodeFromStatus(status);
    const fallbackMessage =
      code === 'SERVER_ERROR' ? SERVER_ERROR_MESSAGE : DEFAULT_ERROR_MESSAGE;

    // 백엔드 message가 있으면 그대로 사용,
    // 없으면 FE 기본 문구로 대체
    return new AppError(responseMessage ?? fallbackMessage, {
      status,
      code,
      raw: error,
    });
  }

  // axios가 아닌 일반 에러
  if (error instanceof Error) {
    return new AppError(error.message || DEFAULT_ERROR_MESSAGE, {
      code: 'UNKNOWN_ERROR',
      raw: error,
    });
  }

  // 문자열, null, undefined 같은 비표준 에러
  return new AppError(DEFAULT_ERROR_MESSAGE, {
    code: 'UNKNOWN_ERROR',
    raw: error,
  });
};
