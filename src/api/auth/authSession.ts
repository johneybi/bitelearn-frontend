import { queryClient } from '@/lib/queryClient';
import { authQueryKeys } from './auth.query';
import { clearAccessToken } from './tokenStore';

export function clearAuthSession() {
  clearAccessToken();
  queryClient.setQueryData(authQueryKeys.me, null);
}
