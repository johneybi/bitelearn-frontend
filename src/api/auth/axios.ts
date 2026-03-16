import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { clearAccessToken } from './tokenStore';
import { useAuthStore } from '@/stores/auth.store';
import { ensureValidAccessToken, refreshAccessToken } from './authRefresh';

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
apiClient.interceptors.request.use(
  async (config) => {
    const requestConfig = config as RetryableRequestConfig;

    // refresh 호출 자체는 다시 검사하지 않도록 제외
    if (requestConfig.skipAuthRefresh) {
      return requestConfig;
    }

    const accessToken = await ensureValidAccessToken();

    // 유효한 액세스 토큰이 존재하면 헤더에 주입
    if (accessToken) {
      requestConfig.headers = requestConfig.headers ?? {};
      requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return requestConfig;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    // 원래 요청이 없거나 이미 재시도한 경우 에러 반환
    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const isRefreshRequest = originalRequest.url?.includes('/auth/refresh');
    // refresh 요청 자체에서 401이 발생하면 무한 루프 방지 위해 에러 반환
    if (originalRequest.skipAuthRefresh || isRefreshRequest) {
      return Promise.reject(error);
    }

    // 401 fallback
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      // 새 토큰이 없는 경우 인증 상태 초기화 후 에러 반환
      if (!newAccessToken) {
        clearAccessToken();
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      // 헤더가 없는 경우 초기화
      originalRequest.headers = originalRequest.headers ?? {};

      // 원래 요청에 새 access token 주입
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // 실패했던 원래 요청 재시도
      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
