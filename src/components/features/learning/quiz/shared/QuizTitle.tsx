type QuizTitleProps = {
  questionNumber?: number;
  questionTitle: string;
};

export default function QuizTitle({
  questionNumber,
  questionTitle,
}: QuizTitleProps) {
  return (
    <h2 className="mb-4 text-base font-semibold text-slate-600">
      {questionNumber ? `Q${questionNumber}. ` : ''}
      {questionTitle}
    </h2>
  );
}
