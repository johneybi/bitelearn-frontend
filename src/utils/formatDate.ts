const TIMEZONE_SUFFIX_PATTERN = /(?:Z|[+-]\d{2}:\d{2})$/;

// timezone 정보가 없으면 UTC 시각으로 간주해 Z를 붙여 파싱
export const parseDate = (dateString: string) => {
  const normalizedDateString = TIMEZONE_SUFFIX_PATTERN.test(dateString)
    ? dateString
    : `${dateString}Z`;

  return new Date(normalizedDateString);
};

// 날짜 문자열을 "YYYY. MM. DD." 형식으로 변환
export const formatDate = (dateString: string) => {
  const date = parseDate(dateString);

  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(
    date.getDate()
  ).padStart(2, '0')}.`;
};

// 날짜 문자열을 "오전/오후 hh:mm" 형식으로 변환
export const formatTime = (dateString: string) =>
  parseDate(dateString).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
