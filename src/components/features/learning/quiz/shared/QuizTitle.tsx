type QuizTitleProps = {
  questionNumber?: number;
  question: string;
};

export default function QuizTitle({
  questionNumber,
  question,
}: QuizTitleProps) {
  return (
    <h2 className="mb-4 text-base font-semibold text-slate-600">
      {questionNumber ? `Q${questionNumber}. ` : ''}
      {question}
    </h2>
  );
}
