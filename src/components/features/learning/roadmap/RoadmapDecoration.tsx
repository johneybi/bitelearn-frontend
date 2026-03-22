/**
 * RoadmapDecoration — 로드맵 좌우에 배치되는 장식 캐릭터 이미지 컴포넌트
 *
 * 구조 (피그마 그대로):
 *  ┌─ 컨테이너 div (relative)
 *  ├─ 그림자 img  — mix-blend-mode: multiply, 약간 더 크고 오프셋
 *  └─ 캐릭터 img  — normal blend, 지정 opacity
 *
 * 사용법:
 *  <RoadmapDecoration
 *    type="house"
 *    side="right"
 *    anchorY={nodeY + offsetY}   ← getNodeY(index) 결과에 offsetY 더하기
 *  />
 *
 * anchorY: 캔버스 내 절대 top 좌표 (px)
 * side: 'left' | 'right' — 컨테이너 가장자리 기준으로 배치
 */

type DecorationConfig = {
  shadow: { src: string; size: number; offsetX: number; offsetY: number };
  char: { src: string; size: number; offsetX: number; offsetY: number; opacity: number; flip?: boolean };
  containerSize: number;
};

const DECORATION_CONFIGS: Record<string, DecorationConfig> = {
  // 집 아이콘 (부동산 도메인)
  house: {
    containerSize: 180,
    shadow: { src: '/assets/roadmap/house-shadow.png', size: 176, offsetX: 4, offsetY: 0 },
    char:   { src: '/assets/roadmap/house-char.png',   size: 128, offsetX: 24, offsetY: 26, opacity: 1 },
  },
  // 멍뭉이 — 180도 뒤집힘 (피그마 원본 그대로)
  mungmung: {
    containerSize: 180,
    shadow: { src: '/assets/roadmap/mungmung-shadow.png', size: 200, offsetX: -15, offsetY: -9 },
    char:   { src: '/assets/roadmap/mungmung-char.png',   size: 168, offsetX: 12, offsetY: -5, opacity: 0.9, flip: true },
  },
  // 불독
  bulldog: {
    containerSize: 180,
    shadow: { src: '/assets/roadmap/mungmung-shadow.png', size: 200, offsetX: -11, offsetY: -12 },
    char:   { src: '/assets/roadmap/bulldog-char.png',    size: 168, offsetX: 8,   offsetY: -10, opacity: 0.9 },
  },
  // 나무
  tree: {
    containerSize: 180,
    shadow: { src: '/assets/roadmap/tree-shadow.png', size: 200, offsetX: -21, offsetY: -17 },
    char:   { src: '/assets/roadmap/tree-char.png',   size: 128, offsetX: 23,  offsetY: -11, opacity: 0.8 },
  },
};

type Props = {
  type: keyof typeof DECORATION_CONFIGS;
  /** 스크롤 가능한 로드맵 캔버스 내부 기준 top (px) */
  anchorY: number;
  /** 컨테이너의 어느 쪽 가장자리에 붙일지 */
  side: 'left' | 'right';
  /** side 기준 픽셀 오프셋 (양수=안쪽, 음수=바깥쪽) — 기본 -20으로 가장자리에서 살짝 걸침 */
  sideOffset?: number;
};

export default function RoadmapDecoration({ type, anchorY, side, sideOffset = -20 }: Props) {
  const cfg = DECORATION_CONFIGS[type];
  if (!cfg) return null;

  const { containerSize, shadow, char } = cfg;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: anchorY,
        // transform은 새로운 stacking context를 만들어버리기 때문에 블렌드가 안 먹힙니다.
        // 대신 marginTop을 사용해서 -50%를 적용합니다.
        marginTop: -containerSize / 2,
        width: containerSize,
        height: containerSize,
        // side 기준으로 얼마나 떨어질지
        ...(side === 'right'
          ? { right: sideOffset }
          : { left: sideOffset }),
      }}
    >
      {/* 그림자 레이어 — mix-blend-mode: multiply (피그마: div에 blend 적용, img는 inset-0 fill) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: shadow.size,
          height: shadow.size,
          left: shadow.offsetX,
          top: shadow.offsetY,
          mixBlendMode: 'multiply',
        }}
      >
        <img
          alt=""
          src={shadow.src}
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%', objectFit: 'fill' }}
        />
      </div>

      {/* 캐릭터 레이어 — normal (피그마: div로 위치 잡고 img는 inset-0 fill) */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: char.size,
          height: char.size,
          left: char.offsetX,
          top: char.offsetY,
          opacity: char.opacity,
          // 피그마에서 mungmung은 -scale-y-100 rotate-180(= scaleX(-1))으로 뒤집혀 있음
          // transform을 img가 아닌 이 div에 적용: img의 inset-0/fill이 flip 후에도 정확히 동작
          ...(char.flip ? { transform: 'rotate(180deg) scaleY(-1)' } : {}),
        }}
      >
        <img
          alt=""
          src={char.src}
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%', objectFit: 'fill' }}
        />
      </div>
    </div>
  );
}
