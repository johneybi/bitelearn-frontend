import level1Image from '@/assets/level/level_1.png';
import level2Image from '@/assets/level/level_2.png';
import level3Image from '@/assets/level/level_3.png';

export const LEVEL_META = [
  {
    level: 1,
    name: '하룻강아지',
    description: '아직은 미숙한 하룻강아지',
    image: level1Image,
    badgeClassName: 'border-orange-100 bg-orange-50',
  },
  {
    level: 2,
    name: '서당개',
    description: '이제는 알 건 알아요',
    image: level2Image,
    badgeClassName: 'border-orange-300 bg-orange-100',
  },
  {
    level: 3,
    name: '탐지견',
    description: '함정은 내가 다 찾아주마',
    image: level3Image,
    badgeClassName: 'border-green-200 bg-green-100',
  },
] as const;

export function normalizeLevel(level?: number) {
  return level === 2 || level === 3 ? level : 1;
}

export function getLevelMeta(level?: number) {
  const normalizedLevel = normalizeLevel(level);

  return (
    LEVEL_META.find((item) => item.level === normalizedLevel) ?? LEVEL_META[0]
  );
}
