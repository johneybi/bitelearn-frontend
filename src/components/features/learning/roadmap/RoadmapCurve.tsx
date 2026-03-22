import {
  HALF_BTN,
  SVG_W,
  STEP_Y,
  X_OFFSETS,
  smoothPath,
} from './roadmap.utils';

type RoadmapCurveProps = {
  count: number;
  totalHeight: number;
};

export default function RoadmapCurve({
  count,
  totalHeight,
}: RoadmapCurveProps) {
  if (count <= 1) return null;

  const centerX = SVG_W / 2;
  const points: [number, number][] = Array.from({ length: count }, (_, i) => [
    centerX + X_OFFSETS[i % 4],
    HALF_BTN + i * STEP_Y,
  ]);

  const d = smoothPath(points);

  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
      width={SVG_W}
      height={totalHeight}
      viewBox={`0 0 ${SVG_W} ${totalHeight}`}
      fill="none"
    >
      <path
        d={d}
        className="stroke-white/60"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d={d}
        className="stroke-white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
