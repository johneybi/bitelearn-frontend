export const CHARACTER_STATES = {
  POOR: {
    threshold: 1000,
    image: '/images/character/dog_fail.png',
    message: '멍멍이가 배가 고파요... 바이트를 더 모아볼까요? 🦴',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
  },
  MIDDLE: {
    threshold: 5000,
    image: '/images/character/dog_close.png',
    message: '멍멍이가 열심히 공부하고 있어요! 🐾',
    bgColor: 'bg-blue-50/30',
    borderColor: 'border-blue-100',
  },
  WEALTHY: {
    threshold: Infinity,
    image: '/images/character/dog_perfect.png',
    message: '우와! 멍멍이가 부자가 되었어요! 프로 어른의 길! 💰',
    bgColor: 'bg-amber-50/30',
    borderColor: 'border-amber-100',
  },
} as const;
