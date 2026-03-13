import apiClient from './axios';
import { setAccessToken, clearAccessToken } from './tokenStore';
import type { RefreshResponse } from './auth.types';
import type { InternalAxiosRequestConfig } from 'axios';

type RefreshRequestConfig = InternalAxiosRequestConfig & {
  skipAuthRefresh?: boolean;
};

let refreshPromise: Promise<string> | null = null;

export const refreshAccessToken = async (): Promise<string> => {
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
      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      clearAccessToken();
      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
