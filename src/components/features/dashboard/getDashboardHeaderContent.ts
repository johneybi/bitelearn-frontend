type DashboardHeaderContentParams = {
  isLoggedIn: boolean;
  nickname?: string | null;
};

type DashboardHeaderContent = {
  title: string;
  subtitle: string;
  profileButtonLabel: string;
};

export function getDashboardHeaderContent({
  isLoggedIn,
  nickname,
}: DashboardHeaderContentParams): DashboardHeaderContent {
  if (!isLoggedIn) {
    return {
      title: 'BiteLearn',
      subtitle: '로그인하고 맞춤 학습을 시작해보세요.',
      profileButtonLabel: '로그인 화면으로 이동',
    };
  }

  return {
    title: `반가워요, ${nickname ?? 'Bitelearn'}님! 👋`,
    subtitle: '오늘도 한 입 지식을 챙겨볼까요?',
    profileButtonLabel: '마이페이지로 이동',
  };
}
