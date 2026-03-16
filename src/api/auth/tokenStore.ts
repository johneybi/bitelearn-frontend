import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TokenState = {
  accessToken: string | null;
  expiresAt: number | null;
  setToken: (accessToken: string, expiresAt: number) => void;
  clearToken: () => void;
};

// 액세스 토큰과 만료 시간을 저장하는 Zustand 스토어
export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresAt: null,

      setToken: (accessToken, expiresAt) => {
        set({
          accessToken,
          expiresAt,
        });
      },

      clearToken: () => {
        set({
          accessToken: null,
          expiresAt: null,
        });
      },
    }),
    {
      name: 'auth-token-storage',
    }
  )
);

// 액세스 토큰과 만료 시간을 가져오거나 실행하는 유틸 함수
export const getAccessToken = () => useTokenStore.getState().accessToken;
export const getExpiresAt = () => useTokenStore.getState().expiresAt;

export const setAccessToken = (accessToken: string, expiresAt: number) =>
  useTokenStore.getState().setToken(accessToken, expiresAt);

export const clearAccessToken = () => useTokenStore.getState().clearToken();
