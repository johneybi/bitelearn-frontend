// DB에 저장된 유저 이름에서 랜덤으로 붙은 고유 해시값을 제거
export const formatDisplayName = (rawName?: string | null): string => {
  // 이름이 없거나 빈 값이면 빈 문자열을 반환
  if (!rawName) return '';

  const lastIndex = rawName.lastIndexOf('_');

  // '_'가 없으면 원본 반환, 있으면 마지막 '_' 앞까지만 잘라서 반환
  return lastIndex !== -1 ? rawName.slice(0, lastIndex) : rawName;
};
