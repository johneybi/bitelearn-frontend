// ISO 날짜 문자열을 "YYYY. MM. DD." 형식으로 변환
export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(
    date.getDate()
  ).padStart(2, '0')}.`;
};
