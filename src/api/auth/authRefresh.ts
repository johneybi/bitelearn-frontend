import axios, { type InternalAxiosRequestConfig } from 'axios';
import apiClient from './axios';
import {
  setAccessToken,
  clearAccessToken,
  getAccessToken,
  getExpiresAt,
} from './tokenStore';
import type { RefreshResponse } from './auth.types';
import { toExpiresAt, isTokenExpiringSoon } from './token.util';
import { useAuthStore } from '@/stores/auth.store';

type RefreshRequestConfig = InternalAxiosRequestConfig & {
  skipAuthRefresh?: boolean;
};

const MAX_REFRESH_RETRIES = 2;
const RETRY_DELAY_STEP_MS = 1000;

let refreshPromise: Promise<string | null> | null = null;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetryRefresh = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  const status = error.response?.status;

  // 네트워크 오류나 타임아웃처럼 응답 자체가 없으면 재시도
  if (!status) {
    return true;
  }

  // 서버 일시 장애만 재시도하고 인증 실패는 즉시 중단
  return [500, 502, 503, 504].includes(status);
};

// 액세스 토큰을 새로고침하는 함수
export const refreshAccessToken = async (): Promise<string | null> => {
  // 이미 refresh 진행 중이면 그 결과를 그대로 기다림
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      for (let attempt = 0; attempt <= MAX_REFRESH_RETRIES; attempt += 1) {
        try {
          const response = await apiClient.post<RefreshResponse>(
            '/auth/refresh',
            {},
            {
              skipAuthRefresh: true,
            } as RefreshRequestConfig
          );

          // 새 access token 저장
          const { accessToken, accessTokenExpiresIn } = response.data;
          const expiresAt = toExpiresAt(accessTokenExpiresIn);

          setAccessToken(accessToken, expiresAt);
          return accessToken;
        } catch (error) {
          const isLastAttempt = attempt === MAX_REFRESH_RETRIES;

          if (!shouldRetryRefresh(error) || isLastAttempt) {
            // refresh 최종 실패 시 토큰 삭제
            clearAccessToken();
            useAuthStore.getState().clearAuth();
            return null;
          }

          const delayMs = RETRY_DELAY_STEP_MS * (attempt + 1);
          await sleep(delayMs);
        }
      }
    } finally {
      refreshPromise = null;
    }

    clearAccessToken();
    useAuthStore.getState().clearAuth();
    return null;
  })();

  return refreshPromise;
};

// 유효한 액세스 토큰을 보장하는 함수
export const ensureValidAccessToken = async (): Promise<string | null> => {
  const accessToken = getAccessToken();
  const expiresAt = getExpiresAt();

  // 토큰 없으면 refresh
  if (!accessToken) {
    return refreshAccessToken();
  }

  // 토큰이 만료됐거나 곧 만료될 예정이면 refresh
  if (isTokenExpiringSoon(expiresAt)) {
    return refreshAccessToken();
  }

  // 아직 유효하면 그대로 사용
  return accessToken;
};
