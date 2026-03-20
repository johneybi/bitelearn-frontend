import apiClient from '@/api/auth/axios';
import type {
  GetNotesRequest,
  GetNotesResponse,
  IncorrectNoteDetailResponse,
} from './notes.types';

// 오답노트 목록 조회
export async function getNotes(
  params: GetNotesRequest = {}
): Promise<GetNotesResponse> {
  const response = await apiClient.get<GetNotesResponse>('/notes/incorrect', {
    params,
  });

  return response.data;
}

// 오답노트 상세 조회
export async function getIncorrectNoteDetail(
  noteId: number
): Promise<IncorrectNoteDetailResponse> {
  const response = await apiClient.get<IncorrectNoteDetailResponse>(
    `/notes/incorrect/${noteId}`
  );

  return response.data;
}
