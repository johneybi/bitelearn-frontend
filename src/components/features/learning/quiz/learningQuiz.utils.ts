import type {
  DocumentElementInfo,
  QuizInfo,
} from '@/api/learning/learning.types';
import type { DocumentCardData } from './shared/DocumentCard';

function normalizeDocumentText(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

export function findDocumentFieldIndexByAnswerText(
  documentElements: DocumentElementInfo[],
  answerText: string
) {
  const normalizedAnswer = normalizeDocumentText(answerText);

  if (!normalizedAnswer) return -1;

  const exactMatchIndex = documentElements.findIndex((element) => {
    const normalizedKey = normalizeDocumentText(element.key);
    const normalizedValue = normalizeDocumentText(element.value);

    return (
      normalizedKey === normalizedAnswer || normalizedValue === normalizedAnswer
    );
  });

  if (exactMatchIndex !== -1) {
    return exactMatchIndex;
  }

  return documentElements.findIndex((element) => {
    const normalizedKey = normalizeDocumentText(element.key);
    const normalizedValue = normalizeDocumentText(element.value);

    return (
      normalizedKey.includes(normalizedAnswer) ||
      normalizedValue.includes(normalizedAnswer) ||
      normalizedAnswer.includes(normalizedKey) ||
      normalizedAnswer.includes(normalizedValue)
    );
  });
}

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
