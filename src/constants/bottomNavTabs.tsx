import homeIcon from '@/assets/icons/bottomNav/home.svg';
import homeActiveIcon from '@/assets/icons/bottomNav/home_active.svg';
import learnIcon from '@/assets/icons/bottomNav/learn.svg';
import learnActiveIcon from '@/assets/icons/bottomNav/learn_active.svg';
import noteIcon from '@/assets/icons/bottomNav/note.svg';
import noteActiveIcon from '@/assets/icons/bottomNav/note_active.svg';
import articleIcon from '@/assets/icons/bottomNav/article.svg';
import articleActiveIcon from '@/assets/icons/bottomNav/article_active.svg';
import mypageIcon from '@/assets/icons/bottomNav/mypage.svg';
import mypageActiveIcon from '@/assets/icons/bottomNav/mypage_active.svg';

type BottomNavTab = {
  label: string;
  path: string;
  iconSrc: string;
  activeIconSrc: string;
};

export const BOTTOM_NAV_TABS: BottomNavTab[] = [
  {
    label: '홈',
    path: '/',
    iconSrc: homeIcon,
    activeIconSrc: homeActiveIcon,
  },
  {
    label: '학습',
    path: '/learning',
    iconSrc: learnIcon,
    activeIconSrc: learnActiveIcon,
  },
  {
    label: '노트',
    path: '/notes',
    iconSrc: noteIcon,
    activeIconSrc: noteActiveIcon,
  },
  {
    label: '아티클',
    path: '/articles',
    iconSrc: articleIcon,
    activeIconSrc: articleActiveIcon,
  },
  {
    label: '마이',
    path: '/mypage',
    iconSrc: mypageIcon,
    activeIconSrc: mypageActiveIcon,
  },
];
