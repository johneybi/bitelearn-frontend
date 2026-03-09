export const STEP_Y = 160;
export const HALF_BTN = 40;
export const SVG_W = 100;
export const X_OFFSETS = [-35, 0, 35, 0] as const;

export function smoothPath(points: [number, number][]) {
  if (points.length < 2) return '';

  let d = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0]} ${p2[1]}`;
  }

  return d;
}

export function getRoadmapOffset(index: number) {
  return X_OFFSETS[index % 4];
}

export function getRoadmapLayoutHeight(count: number) {
  const TEXT_H = 72;
  return HALF_BTN + (count - 1) * STEP_Y + HALF_BTN + TEXT_H;
}
