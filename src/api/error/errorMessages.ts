// 백엔드 ErrorCode enum 이름과 동일한 키 사용
export const API_ERROR_MESSAGE = {
  EMAIL_DUPLICATION: '이미 존재하는 이메일입니다.',
  LOGIN_FAILED: '아이디 또는 비밀번호가 잘못되었습니다.',
  INVALID_REFRESH_TOKEN: '유효하지 않은 리프레시 토큰입니다.',
  EXPIRED_REFRESH_TOKEN: '만료된 리프레시 토큰입니다.',
  USER_NOT_FOUND: '존재하지 않는 유저입니다.',
  NICKNAME_DUPLICATION: '이미 사용 중인 닉네임입니다.',
} as const;
