import type { MeResponse } from '@/api/auth/auth.types';
import { create } from 'zustand';

type AuthState = {
  user: MeResponse | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setUser: (user: MeResponse | null) => void;
  clearAuth: () => void;
  setIsInitializing: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  setIsInitializing: (value) =>
    set({
      isInitializing: value,
    }),
}));
