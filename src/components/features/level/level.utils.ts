import { getLevelMeta, normalizeLevel } from './levelMeta';

const LEVEL_BYTE_RANGES = [
  { level: 1, minBytes: 0, maxBytes: 2000 },
  { level: 2, minBytes: 2000, maxBytes: 4000 },
  { level: 3, minBytes: 4000, maxBytes: 6000 },
] as const;

export function formatByteCount(value: number) {
  return new Intl.NumberFormat('ko-KR').format(Math.abs(value));
}

export function formatBytes(value: number) {
  return `${formatByteCount(value)} B`;
}

export function getLevelState(level?: number) {
  const normalizedLevel = normalizeLevel(level);
  const levelMeta = getLevelMeta(normalizedLevel);

  return {
    normalizedLevel,
    levelMeta,
  };
}

export function getLevelByteProgress(params: {
  currentLevel?: number;
  currentTotalBytes: number;
}) {
  const derivedLevelRange =
    LEVEL_BYTE_RANGES.find(
      ({ minBytes, maxBytes }) =>
        params.currentTotalBytes >= minBytes &&
        params.currentTotalBytes < maxBytes
    ) ?? LEVEL_BYTE_RANGES[LEVEL_BYTE_RANGES.length - 1];
  const levelRange =
    LEVEL_BYTE_RANGES.find(({ level }) => level === params.currentLevel) ??
    derivedLevelRange;
  const clampedBytes = Math.min(params.currentTotalBytes, levelRange.maxBytes);
  const remainingBytes = Math.max(0, levelRange.maxBytes - clampedBytes);
  const progressPercentage = Math.min(
    100,
    Math.max(
      0,
      ((clampedBytes - levelRange.minBytes) /
        Math.max(1, levelRange.maxBytes - levelRange.minBytes)) *
        100
    )
  );

  return {
    currentLevel: levelRange.level,
    title: levelRange.level === 3 ? '3레벨 완성까지' : '다음 레벨까지',
    remainingBytes,
    remainingLabel:
      levelRange.level === 3 && params.currentTotalBytes >= levelRange.maxBytes
        ? 'MAX'
        : formatBytes(remainingBytes),
    progressPercentage,
  };
}
