export type CursorRequest = {
  cursor: string | null;
  size: number;
};

export type CursorResponse<T> = {
  items: T[];
  nextCursor: string | null;
  hasNext: boolean;
};
