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
import type { InternalAxiosRequestConfig } from 'axios';

type RefreshRequestConfig = InternalAxiosRequestConfig & {
  skipAuthRefresh?: boolean;
};

let refreshPromise: Promise<string | null> | null = null;

// 액세스 토큰을 새로고침하는 함수
export const refreshAccessToken = async (): Promise<string | null> => {
  // 이미 refresh 진행 중이면 그 결과를 그대로 기다림
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
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
    } catch {
      // refresh 실패 시 토큰 삭제
      clearAccessToken();
      useAuthStore.getState().clearAuth();
      return null;
    } finally {
      refreshPromise = null;
    }
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
