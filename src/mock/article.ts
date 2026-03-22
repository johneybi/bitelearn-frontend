export type ContentBlock =
  | {
      /** 일반 텍스트 문단 */
      type: 'paragraph';
      content: string;
    }
  | {
      /** 섹션 제목 (level 2 or 3) */
      type: 'heading';
      level: number;
      content: string;
    }
  | {
      /** 본문 삽입 이미지 */
      type: 'image';
      url: string;
      altText: string;
      /** 이미지 하단 설명 텍스트 */
      caption?: string;
    }
  | {
      /** 리스트 형태 (순서 있음/없음) */
      type: 'list';
      listType: 'unordered' | 'ordered';
      items: string[];
    }
  | {
      /** 인용구 블록 */
      type: 'quote';
      content: string;
    };

/** 아티클 상세 데이터 인터페이스 */
export interface ArticleDetail {
  /** 아티클 고유 ID */
  articleId: string;
  /** 아티클 제목 */
  title: string;
  /** 목록 및 상세 상단 커버 이미지 URL */
  thumbnailUrl?: string;
  /** 작성자(에디터) 정보 */
  author: {
    name: string;
    profileImageUrl?: string;
  };
  /** 발행 일시 (ISO 형식) */
  publishedAt: string;
  /** 조회수 */
  viewCount?: number;
  /** 관련 태그 목록 */
  tags?: string[];
  /** 아티클 상단 3줄 요약 정보 */
  summary?: {
    title: string;
    points: string[];
  };
  /** 본문 콘텐츠 블록 배열 */
  contentBlocks?: ContentBlock[];
}

// ─── Mock Data ──────────────────────────────────────────────

export type ArticleCardItem = {
  articleId: string;
  title: string;
  thumbnailUrl?: string;
  publishedAt: string;
  authorName: string;
};

export type ArticleListItem = ArticleCardItem;

/**
 * [샘플 아티클] 전세사기 방지 체크리스트
 * 바이트런 앱의 아티클 상세 화면 시연을 위한 모크 데이터입니다.
 */
export const mockArticles: ArticleDetail[] = [
  {
    articleId: 'article-2026-001',
    title:
      '전세사기 방지 필수 체크리스트 | 계약 전 확인, 특약 작성, 보증보험까지',
    thumbnailUrl: '/images/article/article_thumbnail.png',
    author: {
      name: '에디터 샐리',
      profileImageUrl: '/images/article/article_author_avatar.png',
    },
    publishedAt: '2026-03-05T10:00:00Z',
    viewCount: 12504,
    tags: ['전세사기', '부동산', '보증보험', '특약', '대항력'],
    summary: {
      title: '내 보증금 완벽하게 지켜내는 TIP!',
      points: [
        '전세 계약 전, 등기부등본과 건축물대장 확인은 선택이 아닌 필수예요.',
        "계약서 작성 시, '나를 지켜주는 든든한 특약'을 반드시 넣어야 해요.",
        '복잡한 서류와 어려운 부동산 용어, 이제 바이트런이 가장 쉽고 안전하게 해석해 드릴게요.',
      ],
    },
    contentBlocks: [
      {
        type: 'paragraph',
        content:
          '“집 구하는 것도 힘든데, 알아봐야 할 서류는 왜 이렇게 많지?”, “등기부등본을 떼보긴 했는데, 이 한자가 대체 무슨 뜻이야?”\n\n전세사기 관련 뉴스는 쏟아지는데 막상 내 전세 계약을 앞두고 있다면, 어려운 부동산 용어와 복잡한 확인 절차 때문에 막막하기 쉽죠. 기존 공공기관의 부동산 앱을 깔아봐도 전문가가 아닌 이상 헷갈리는 건 마찬가지고요.',
      },
      {
        type: 'heading',
        level: 3,
        content: '전세사기, 내가 꼼꼼하지 못해서 당하는 걸까요?',
      },
      {
        type: 'paragraph',
        content:
          "최근 사회초년생과 청년층을 중심으로 전세사기 피해가 끊이지 않고 있어요. 내가 꼼꼼히 안 알아봐서 당한 걸까요? 절대 아니에요. 부동산 계약 구조 자체가 세입자가 모든 정보를 투명하게 알기 어려운 '정보의 비대칭성'이라는 구조적 한계가 가장 커요.",
      },
      {
        type: 'image',
        url: '/images/article/article_content_doc.png',
        altText: '복잡한 서류를 보며 고민하는 사람의 모습',
        caption: '어려운 부동산 서류, 꼼꼼히 확인하는 것만이 정답일까요?',
      },
      {
        type: 'list',
        listType: 'unordered',
        items: [
          '**등기부등본 (나보다 먼저 돈 받을 사람이 있는지 확인)**: 집주인이 이 집을 담보로 빌린 돈(근저당권)이 너무 많지 않은지 체크하세요. 통상적으로 융자금과 내 전세보증금을 합친 금액이 집값의 70%를 넘는다면 계약하지 않는 것이 안전해요.',
          "**건축물대장 (불법으로 지어진 집인지 확인)**: 서류상 '위반건축물'로 노란색 딱지가 붙어있다면 주의해야 해요. 전세자금대출이 거절되거나 전세보증보험 가입이 아예 불가능할 수 있어요.",
          "**임대인 세금 체납 여부 (숨겨진 빚 확인)**: 집주인이 밀린 세금이 있다면, 집이 잘못되어 경매로 넘어갔을 때 내 보증금보다 국가 세금이 먼저 빠져나가요. 계약하기 전 집주인에게 '국세·지방세 완납 증명서'를 꼭 요구하세요.",
        ],
      },
      {
        type: 'quote',
        content:
          '1. "전세보증금 반환보증보험 가입 불가 시, 본 계약은 무효로 하고 계약금 전액을 즉시 반환한다."\n2. "임대인은 잔금 지급일 다음 날까지 현재의 권리 상태를 유지한다."\n3. "계약 기간 중 임대인이 변경될 경우, 사전에 임차인에게 통지한다."',
      },
    ],
  },
  {
    articleId: 'article-2026-002',
    title: '등기부등본 혼자 읽는 법 - 갑구·을구·표제부 완벽 정리',
    author: {
      name: '에디터 도윤',
    },
    publishedAt: '2026-02-21T09:00:00Z',
  },
  {
    articleId: 'article-2026-003',
    title: '계약서 도장 찍기 1분 전! - 내 보증금 지키는 마법의 특약',
    author: {
      name: '에디터 서윤',
    },
    publishedAt: '2026-02-18T10:00:00Z',
  },
  {
    articleId: 'article-2026-004',
    title: '내 연봉에 맞는 대출 한도 - DSR 계산기로 미리 확인하기',
    author: {
      name: '에디터 지안',
    },
    publishedAt: '2026-02-14T09:30:00Z',
  },
  {
    articleId: 'article-2026-005',
    title: '권고사직 vs 자진퇴사 - 실업급여 받을 수 있는 결정적 차이',
    author: {
      name: '에디터 하린',
    },
    publishedAt: '2026-01-30T08:00:00Z',
  },
  {
    articleId: 'article-2026-006',
    title: '연말정산 13월의 월급? - 놓치면 손해 보는 공제 항목 TOP 5',
    author: {
      name: '에디터 유진',
    },
    publishedAt: '2026-01-22T10:00:00Z',
  },
  {
    articleId: 'article-2026-007',
    title: '이직할 때 연봉 협상 기술 - 내 가치를 제대로 증명하는 법',
    author: { name: '에디터 태윤' },
    publishedAt: '2026-01-15T09:00:00Z',
  },
  {
    articleId: 'article-2026-008',
    title: '주린이를 위한 포트폴리오 가이드 - 분산 투자의 핵심 노하우',
    author: { name: '에디터 채원' },
    publishedAt: '2026-01-08T09:00:00Z',
  },
  {
    articleId: 'article-2026-009',
    title: '분할 매수의 기술 - 변동성 심한 장에서 살아남는 법',
    author: { name: '에디터 시우' },
    publishedAt: '2025-12-30T09:00:00Z',
  },
];

export const mockArticleCards: ArticleListItem[] = [...mockArticles]
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  .map((article) => ({
    articleId: article.articleId,
    title: article.title,
    thumbnailUrl: article.thumbnailUrl,
    publishedAt: article.publishedAt,
    authorName: article.author.name,
  }));
