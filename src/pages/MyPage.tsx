import { useNavigate } from 'react-router-dom';
import type { MenuItem } from '@/components/features/mypage/mypage.types';
import MyProfileCard from '@/components/features/mypage/MyProfileCard';
import MyPageMenuSection from '@/components/features/mypage/MyPageMenuSection';

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

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden text-slate-900">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-slate-100 bg-white">
        <div className="flex h-14 items-center px-4">
          <div className="h-8 w-8" />
          <h1 className="flex-1 text-center text-sm font-bold text-slate-900">
            마이페이지
          </h1>
          <div className="h-8 w-8" />
        </div>
      </header>

      <section className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-24 pt-20">
        <MyProfileCard
          nickname="사용자"
          email="test@bitelearn.com"
          onClick={() => navigate('/mypage/account')}
        />
        <MyPageMenuSection items={MENU_ITEMS} />
      </section>
    </div>
  );
}
