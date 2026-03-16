// 액세스 토큰의 만료 시간 계산
export const toExpiresAt = (expiresInMs: number) => {
  return Date.now() + expiresInMs;
};

// 액세스 토큰의 만료 여부 확인
export const isTokenExpired = (expiresAt: number | null) => {
  if (!expiresAt) return true;
  return Date.now() >= expiresAt;
};

// 액세스 토큰의 만료 임박 여부 확인
export const isTokenExpiringSoon = (expiresAt: number | null) => {
  const REFRESH_BUFFER_MS = 60 * 1000; // 1분 전이면 만료 임박으로 간주

  const result = !expiresAt || Date.now() >= expiresAt - REFRESH_BUFFER_MS;

  return result;
};
