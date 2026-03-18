import type {
  DialogueInfo,
  DocumentElementInfo,
  QuizInfo,
} from '@/api/learning/learning.types';
import type { DocumentCardData } from './shared/DocumentCard';

export function getQuizChoices(quiz: QuizInfo): string[] {
  return quiz.specificData?.options ?? [];
}

export function getQuizChoiceMode(
  quiz: QuizInfo
): 'multiple' | 'ox' | 'document_select' {
  if (quiz.type === 'DIALOGUE_OX') {
    return 'ox';
  }

  if (quiz.type === 'DOC_SELECT') {
    return 'document_select';
  }

  return 'multiple';
}

export function getQuizPassageMode(
  quiz: QuizInfo
): 'text' | 'conversation' | 'document' {
  if (quiz.type === 'DIALOGUE_MCQ' || quiz.type === 'DIALOGUE_OX') {
    return 'conversation';
  }

  if (
    (quiz.type === 'DOC_SELECT' || quiz.type === 'DOC_MULTI') &&
    quiz.specificData?.documentElements?.length
  ) {
    return 'document';
  }

  return 'text';
}

export function getConversationSpeakers(dialogues: DialogueInfo[] = []) {
  return Array.from(new Set(dialogues.map((line) => line.speaker))).map(
    (speaker, speakerIndex) => ({
      id: speaker,
      name: speaker,
      profileImageUrl: undefined,
      position:
        speakerIndex % 2 === 0 ? ('left' as const) : ('right' as const),
    })
  );
}

export function getConversationMessages(
  quizId: number,
  dialogues: DialogueInfo[] = []
) {
  return dialogues.map((line, dialogueIndex) => ({
    id: `d-${quizId}-${dialogueIndex}`,
    speakerId: line.speaker,
    message: line.message,
  }));
}

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
