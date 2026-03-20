import apiClient from '@/api/auth/axios';
import type { GetNotesRequest, GetNotesResponse } from './notes.types';

// 오답노트 목록 조회
export async function getNotes(
  params: GetNotesRequest = {}
): Promise<GetNotesResponse> {
  const response = await apiClient.get<GetNotesResponse>('/notes/incorrect', {
    params,
  });

  return response.data;
}
