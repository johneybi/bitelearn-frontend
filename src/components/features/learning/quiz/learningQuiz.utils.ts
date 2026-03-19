import type { DocumentElementInfo, QuizInfo } from '@/api/learning/learning.types';
import type { DocumentCardData } from './shared/DocumentCard';

export function toDocumentCardData(
  quiz: QuizInfo
): DocumentCardData | null {
  const documentElements = quiz.specificData?.documentElements;

  if (!documentElements?.length) {
    return null;
  }

  return {
    header: quiz.passageTitle ?? '문서',
    subHeader: quiz.questionTitle,
    sectionTitle: '문서 항목',
    fields: documentElements.map((item: DocumentElementInfo) => ({
      label: item.key,
      value: item.value,
    })),
  };
}
