// 날짜 문자열을 "YYYY. MM. DD." 형식으로 변환
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(
    date.getDate()
  ).padStart(2, '0')}.`;
};

// 날짜 문자열을 "오전/오후 hh:mm" 형식으로 변환
export const formatTime = (dateString: string) =>
  new Date(dateString).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
