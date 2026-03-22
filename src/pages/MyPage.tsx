import { useNavigate } from 'react-router-dom';
import type { MenuItem } from '@/components/features/mypage/mypage.types';
import MyProfileCard from '@/components/features/mypage/MyProfileCard';
import MyPageMenuSection from '@/components/features/mypage/MyPageMenuSection';
import { useMeQuery } from '@/api/auth/auth.query';
import { formatDisplayName } from '@/utils/formatUser';

const MENU_ITEMS: MenuItem[] = [
  {
    label: '서비스 약관',
    details: [
      { text: '이용 약관' },
      { text: '개인정보 처리방침' },
      { text: '마케팅 수신 동의' },
    ],
  },
  {
    label: '고객센터',
    details: [
      { text: '자주 묻는 질문' },
      { text: '1:1 문의' },
      { text: '공지사항' },
    ],
  },
];

export default function MyPage() {
  const navigate = useNavigate();
  const { data: user } = useMeQuery();

  return (
    <div className="flex h-full flex-col overflow-hidden text-slate-900">
      <section className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-24 pt-6">
        <MyProfileCard
          nickname={formatDisplayName(user?.nickname)}
          email={user?.email ?? ''}
          onClick={() => navigate('/mypage/account')}
        />
        <MyPageMenuSection items={MENU_ITEMS} />
      </section>
    </div>
  );
}
