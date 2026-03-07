import type { BottomNavTab } from '@/components/common/bottomNav.types';
import {
  GraduationCap,
  House,
  BookOpenCheck,
  FileText,
  UserRound,
} from 'lucide-react';

export const BOTTOM_NAV_TABS: BottomNavTab[] = [
  {
    label: '홈',
    path: '/',
    icon: House,
  },
  {
    label: '학습',
    path: '/learning',
    icon: GraduationCap,
  },
  {
    label: '노트',
    path: '/notes',
    icon: BookOpenCheck,
  },
  {
    label: '아티클',
    path: '/articles',
    icon: FileText,
  },
  {
    label: '마이',
    path: '/mypage',
    icon: UserRound,
  },
];
