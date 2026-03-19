import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import AccountProfileSection from '@/components/features/mypage/AccountProfileSection';
import { logout, updateNickname } from '@/api/auth/auth.api';
import { authQueryKeys, useMeQuery } from '@/api/auth/auth.query';
import { clearAuthSession } from '@/api/auth/authSession';

export default function AccountInfoPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useMeQuery();
  const updateNicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me,
      });
    },
  });

  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  useEffect(() => {
    setNickname(user?.nickname ?? '');
  }, [user?.nickname]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
    } finally {
      clearAuthSession();
      navigate('/login', { replace: true });
    }
  };

  const handleSubmitNickname = async () => {
    if (!user) return;

    const trimmed = nickname.trim();
    if (!trimmed) return;

    if (trimmed === user.nickname) {
      setIsEditingNickname(false);
      return;
    }

    try {
      await updateNicknameMutation.mutateAsync({ nickname: trimmed });

      setIsEditingNickname(false);
    } catch (error) {
      console.error('닉네임 수정 실패', error);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-y-auto bg-white pb-24 text-slate-900">
      <header className="absolute left-0 right-0 top-0 z-20 flex h-14 items-center justify-between border-b border-slate-100 bg-white/90 px-2 backdrop-blur-md">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="마이페이지로 돌아가기"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition-colors hover:bg-slate-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-slate-900">
          계정 정보
        </h1>

        <div className="h-10 w-10" />
      </header>

      <div className="pt-14">
        <AccountProfileSection
          nickname={nickname}
          isEditing={isEditingNickname}
          onEdit={() => setIsEditingNickname(true)}
          onChange={setNickname}
          onSubmit={handleSubmitNickname}
        />

        <section className="mx-5 my-5">
          <article className="px-4 py-6">
            <h2 className="text-sm font-semibold">기본 정보</h2>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="rounded-full px-1 py-1 text-xs text-slate-700">
                  이메일
                </p>
                <p className="cursor-not-allowed rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                  {user?.email ?? ''}
                </p>
              </div>

              <button
                type="button"
                className="flex items-center justify-between"
              >
                <p className="rounded-full px-1 py-1 text-xs text-slate-700">
                  비밀번호 변경
                </p>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </button>
            </div>
          </article>
        </section>

        <section className="mx-5 mt-4 border-t border-slate-200 pt-5">
          <article className="px-4 py-6">
            <h2 className="text-sm font-semibold">계정 관리</h2>

            <div className="mt-4 flex flex-col gap-3 pb-4">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-full px-1 py-1 text-left text-xs text-slate-700"
              >
                로그아웃
              </button>

              <button
                type="button"
                className="w-full rounded-full px-1 py-1 text-left text-xs text-slate-700"
              >
                회원 탈퇴
              </button>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
