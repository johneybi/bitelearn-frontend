type QuizTitleProps = {
  questionNumber?: number;
  showQuestionPrefix?: boolean;
  questionTitle: string;
};

export default function QuizTitle({
  questionNumber,
  showQuestionPrefix = false,
  questionTitle,
}: QuizTitleProps) {
  const questionPrefix =
    questionNumber !== undefined
      ? `Q${questionNumber}.`
      : showQuestionPrefix
        ? 'Q.'
        : null;

  return (
    <div className="px-1">
      <h2 className="text-base font-semibold leading-6 tracking-tight text-foreground">
        {questionPrefix ? (
          <span className="mr-1.5 text-lg leading-7 text-primary">
            {questionPrefix}
          </span>
        ) : null}
        {questionTitle}
      </h2>
    </div>
  );
}
