import type {
  GetLearningChapterResponse,
  GetLearningChaptersResponse,
  LearningCategoryCode,
  LearningChapterListItem,
  LearningProgressStatus,
  LearningQuiz,
  LearningTopicCode,
  LearningVocab,
} from './learning.types';

type TopicKey = `${LearningCategoryCode}:${LearningTopicCode}`;

type MockQuizRecord = LearningQuiz & {
  answer: string;
  explanation: string;
};

type MockChapterDetailRecord = {
  chapterId: number;
  chapterTitle: string;
  prologueSubtitle: string;
  prologueContent: string;
  currentGoal: string;
  coreKeywords: string[];
  currentStatus: LearningProgressStatus;
  resumeQuizSequence: number | null;
  vocabs: LearningVocab[];
  quizzes: MockQuizRecord[];
};

const DEFAULT_VOCABS: LearningVocab[] = [
  {
    id: 1,
    frontMain: '임대인',
    frontSub: '집주인',
    frontImageUrl: 'https://aws-s3.../image1.png',
    backMain: '돈을 받고 집을 빌려주는 사람',
    backSub: "계약서상의 '갑'",
  },
  {
    id: 2,
    frontMain: '임차인',
    frontSub: '세입자',
    frontImageUrl: 'https://aws-s3.../image2.png',
    backMain: '돈을 내고 집을 빌리는 사람',
    backSub: "계약서상의 '을'",
  },
  {
    id: 3,
    frontMain: '근저당권',
    frontSub: '은행 빚',
    frontImageUrl: 'https://aws-s3.../image3.png',
    backMain: '집을 담보로 잡은 채권 권리',
    backSub: '보증금 안전과 직접적으로 연결되는 핵심 항목',
  },
  {
    id: 4,
    frontMain: '확정일자',
    frontSub: '우선변제권',
    frontImageUrl: 'https://aws-s3.../image4.png',
    backMain: '전입신고와 함께 보증금 보호 순위를 확보하는 절차',
    backSub: '이사 당일에 처리해야 안전하다',
  },
  {
    id: 5,
    frontMain: '특약',
    frontSub: '추가 안전장치',
    frontImageUrl: 'https://aws-s3.../image5.png',
    backMain: '표준 계약서 외에 추가로 작성하는 보호 조항',
    backSub: '분쟁 예방을 위해 명확하게 문구를 남긴다',
  },
];

const DEFAULT_QUIZZES: MockQuizRecord[] = [
  {
    quizId: 101,
    sequence: 1,
    type: 'TEXT_MCQ',
    passageTitle: '부동산 계약의 기초',
    passageContent:
      '부동산 계약을 할 때는 반드시 등기부등본을 확인해야 합니다.',
    questionImageUrl: 'https://aws-s3.../q_img1.png',
    questionTitle: '다음 중 등기부등본에서 확인할 수 없는 것은?',
    specificData: {
      options: [
        '1. 소유자의 이름',
        '2. 근저당권 설정 여부',
        '3. 이전 세입자의 월세 체납액',
        '4. 해당 건물의 면적',
      ],
    },
    answer: '3. 이전 세입자의 월세 체납액',
    explanation:
      '등기부등본에는 소유권과 권리관계 중심 정보가 담기며, 이전 세입자의 체납 내역은 포함되지 않습니다.',
  },
  {
    quizId: 102,
    sequence: 2,
    type: 'DOC_SELECT',
    passageTitle: '전세계약서 살펴보기',
    passageContent: '다음은 표준 임대차 계약서의 일부입니다.',
    questionImageUrl: null,
    questionTitle: '특약 사항으로 가장 적절한 문서를 고르시오.',
    specificData: {
      options: [
        {
          docId: 'doc_1',
          docText: '전세금 반환 보증보험 가입 불가 시 계약을 무효로 한다.',
        },
        { docId: 'doc_2', docText: '도배 및 장판은 세입자가 부담한다.' },
        {
          docId: 'doc_3',
          docText: '반려동물 사육 시 퇴거 조치한다.',
        },
      ],
    },
    answer: '전세금 반환 보증보험 가입 불가 시 계약을 무효로 한다.',
    explanation:
      '보증금 회수를 지키는 안전장치는 특약으로 명확히 넣는 것이 중요합니다.',
  },
  {
    quizId: 103,
    sequence: 3,
    type: 'DIALOGUE_MCQ',
    passageTitle: '중개사와의 대화',
    passageContent: null,
    questionImageUrl: null,
    questionTitle: '중개사의 말 중 틀린 것을 고르시오.',
    specificData: {
      dialogues: [
        { speaker: '공인중개사', message: '이 집은 융자가 하나도 없어서 안전해요.' },
        { speaker: '나', message: '등기부등본 떼어볼 수 있을까요?' },
        { speaker: '공인중개사', message: '그냥 가계약금부터 거세요.' },
      ],
      options: [
        '1. 융자가 없으면 무조건 안전하다.',
        '2. 등기부등본은 계약 직전에만 보면 된다.',
        '3. 중개사의 말만 믿고 가계약금을 걸면 안 된다.',
      ],
    },
    answer: '2. 등기부등본은 계약 직전에만 보면 된다.',
    explanation:
      '등기부등본은 계약 직전뿐 아니라 계약 전 검토 과정에서 반복 확인해야 안전합니다.',
  },
  {
    quizId: 104,
    sequence: 4,
    type: 'DIALOGUE_OX',
    passageTitle: '집주인과의 대화',
    passageContent: null,
    questionImageUrl: null,
    questionTitle: '집주인의 요구는 법적으로 타당한가?',
    specificData: {
      dialogues: [
        {
          speaker: '집주인',
          message: '보일러 고장 난 건 소모품이니까 세입자가 알아서 고치세요.',
        },
      ],
      options: ['O', 'X'],
    },
    answer: 'X',
    explanation:
      '수선의무는 계약과 고장 원인에 따라 달라지며, 일괄적으로 세입자 부담이라고 보기 어렵습니다.',
  },
];

const CHAPTERS_BY_TOPIC: Record<TopicKey, LearningChapterListItem[]> = {
  'REAL_ESTATE:JEONSE': [
    {
      chapterId: 1001,
      title: '[1단계] 도장 찍기 전, 멍멍이의 마지막 방어선!',
      status: 'READY',
      sequence: 1,
      isLocked: false,
    },
    {
      chapterId: 1002,
      title: '[2단계] 전입신고와 확정일자 타이밍',
      status: 'READY',
      sequence: 2,
      isLocked: true,
    },
    {
      chapterId: 1003,
      title: '[3단계] 위험 매물 구별 훈련',
      status: 'READY',
      sequence: 3,
      isLocked: true,
    },
    {
      chapterId: 1004,
      title: '[4단계] 계약서 특약 실전',
      status: 'READY',
      sequence: 4,
      isLocked: true,
    },
  ],
  'REAL_ESTATE:WOLSE': [
    {
      chapterId: 1101,
      title: '[1단계] 월세 계약 구조 이해',
      status: 'READY',
      sequence: 1,
      isLocked: false,
    },
    {
      chapterId: 1102,
      title: '[2단계] 관리비 체크 포인트',
      status: 'READY',
      sequence: 2,
      isLocked: true,
    },
    {
      chapterId: 1103,
      title: '[3단계] 퇴실 정산 분쟁 예방',
      status: 'READY',
      sequence: 3,
      isLocked: true,
    },
  ],
  'FINANCE:SALARY': [
    {
      chapterId: 2001,
      title: '[1단계] 월급 명세서 읽는 법',
      status: 'READY',
      sequence: 1,
      isLocked: false,
    },
  ],
  'CAREER:TAX': [
    {
      chapterId: 3001,
      title: '[1단계] 사회초년생 기초 세무',
      status: 'READY',
      sequence: 1,
      isLocked: false,
    },
  ],
  'INVESTMENT:STARTER': [
    {
      chapterId: 4001,
      title: '[1단계] 투자 시작 전 위험 관리',
      status: 'READY',
      sequence: 1,
      isLocked: false,
    },
  ],
};

const CHAPTER_DETAIL_BY_ID: Record<number, MockChapterDetailRecord> = {};

function createChapterDetailRecord(
  chapter: LearningChapterListItem
): MockChapterDetailRecord {
  return {
    chapterId: chapter.chapterId,
    chapterTitle: chapter.title,
    prologueSubtitle: '사기꾼은 이런 사람을 노린다!',
    prologueContent:
      '부동산 계약에서 가장 많이 발생하는 실수는 확인을 미루는 습관입니다.\n이번 챕터에서는 계약 전 반드시 체크해야 할 핵심 기준을 빠르게 익힙니다.',
    currentGoal: '등기부등본 핵심 항목을 스스로 점검할 수 있다.',
    coreKeywords: ['등기부등본', '근저당권', '표제부'],
    currentStatus: 'READY',
    resumeQuizSequence: null,
    vocabs: DEFAULT_VOCABS.map((vocab) => ({ ...vocab })),
    quizzes: DEFAULT_QUIZZES.map((quiz) => ({
      ...quiz,
      quizId: chapter.chapterId * 100 + quiz.sequence,
    })),
  };
}

Object.values(CHAPTERS_BY_TOPIC).forEach((chapters) => {
  chapters.forEach((chapter) => {
    CHAPTER_DETAIL_BY_ID[chapter.chapterId] = createChapterDetailRecord(chapter);
  });
});

export function getMockChaptersByTopic(
  category: LearningCategoryCode,
  topic: LearningTopicCode
): GetLearningChaptersResponse {
  const key = `${category}:${topic}` as TopicKey;
  return {
    chapters: (CHAPTERS_BY_TOPIC[key] ?? []).map((chapter) => ({ ...chapter })),
  };
}

export function getMockChapterDetail(chapterId: number): GetLearningChapterResponse {
  const detail = CHAPTER_DETAIL_BY_ID[chapterId];
  if (!detail) {
    return {
      chapterTitle: '챕터',
      prologueSubtitle: '학습 소개',
      prologueContent: '준비 중인 챕터입니다.',
      currentGoal: '핵심 개념을 이해한다.',
      coreKeywords: [],
      currentStatus: 'READY',
      resumeQuizSequence: null,
      vocabs: [],
      quizzes: [],
    };
  }

  return {
    chapterTitle: detail.chapterTitle,
    prologueSubtitle: detail.prologueSubtitle,
    prologueContent: detail.prologueContent,
    currentGoal: detail.currentGoal,
    coreKeywords: [...detail.coreKeywords],
    currentStatus: detail.currentStatus,
    resumeQuizSequence: detail.resumeQuizSequence,
    vocabs: detail.vocabs.map((vocab) => ({ ...vocab })),
    quizzes: detail.quizzes.map(({ answer, explanation, ...quiz }) => ({
      ...quiz,
    })),
  };
}

export function getMockQuizAnswer(chapterId: number, quizId: number) {
  const detail = CHAPTER_DETAIL_BY_ID[chapterId];
  const quiz = detail?.quizzes.find((item) => item.quizId === quizId);

  if (!quiz) {
    return null;
  }

  return {
    answer: quiz.answer,
    explanation: quiz.explanation,
    lastSequence: detail.quizzes.length,
    sequence: quiz.sequence,
  };
}
