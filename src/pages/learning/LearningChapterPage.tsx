import { useNavigate, useParams } from 'react-router-dom';

import { MOCK_CHOICE_QUESTION_SET } from '@/mock/choiceQuestion';
import ChapterPlayer from '@/components/features/learning/chapter/ChapterPlayer';

export default function LearningChapterPage() {
  const navigate = useNavigate();
  const { categoryId, chapterId } = useParams();

  if (!categoryId || !chapterId) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">
          존재하지 않는 챕터입니다.
        </p>
      </main>
    );
  }

  return (
    <ChapterPlayer
      questionSet={MOCK_CHOICE_QUESTION_SET}
      onBack={() => navigate(-1)}
      onComplete={() => navigate(-1)}
    />
  );
}
