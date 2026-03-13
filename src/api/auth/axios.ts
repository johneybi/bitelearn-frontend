import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, clearAccessToken } from './tokenStore';
import { useAuthStore } from '@/stores/auth.store';
import { refreshAccessToken } from './authRefresh';

// 인터셉터에서 사용할 수 있도록 요청 구성 타입 확장
type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
};

// 공통 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전송 허용
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    // 요청 정보가 없거나 응답 자체가 없으면 그대로 에러 반환
    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;
    const isRefreshRequest = originalRequest.url?.includes('/auth/refresh');
    const shouldSkipRefresh = originalRequest.skipAuthRefresh;

    // 아래 조건일 때만 refresh 시도
    if (
      isUnauthorized &&
      !originalRequest._retry &&
      !isRefreshRequest &&
      !shouldSkipRefresh
    ) {
      originalRequest._retry = true;

      try {
        // 공용 refresh 함수 사용
        // 이미 다른 곳에서 refresh 중이면 같은 Promise를 기다림
        const newAccessToken = await refreshAccessToken();

        // 원래 요청 헤더에 새 access token 주입
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 실패했던 원래 요청 재시도
        return apiClient(originalRequest);
      } catch (refreshError) {
        // refresh 자체가 실패한 경우만 로그아웃 처리
        clearAccessToken();
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
