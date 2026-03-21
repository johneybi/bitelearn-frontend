import type {
  DocumentElementInfo,
  QuizInfo,
} from '@/api/learning/learning.types';
import type { DocumentCardData } from './shared/DocumentCard';

export function toDocumentCardData(quiz: QuizInfo): DocumentCardData | null {
  const documentElements = quiz.specificData?.documentElements;
  const documentTitle = quiz.specificData?.documentTitle;
  const documentSubtitle = quiz.specificData?.documentSubtitle;

  if (!documentElements?.length) {
    return null;
  }

  return {
    header: documentTitle ?? '문서',
    subHeader: documentSubtitle ?? '',
    fields: documentElements.map((item: DocumentElementInfo) => ({
      label: item.key,
      value: item.value,
    })),
  };
}
