import type { MeResponse } from '@/api/auth/auth.types';
import { create } from 'zustand';

type AuthState = {
  user: MeResponse | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isOnboardingOpen: boolean;

  setUser: (user: MeResponse | null) => void;
  clearAuth: () => void;
  setIsInitializing: (value: boolean) => void;
  setIsOnboardingOpen: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  isOnboardingOpen: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isOnboardingOpen: !!user && !user.isOnboardingCompleted,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isOnboardingOpen: false,
    }),

  setIsInitializing: (value) =>
    set({
      isInitializing: value,
    }),

  setIsOnboardingOpen: (value) =>
    set({
      isOnboardingOpen: value,
    }),
}));
