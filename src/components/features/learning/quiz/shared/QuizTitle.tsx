type QuizTitleProps = {
  questionNumber?: number;
  questionTitle: string;
};

export default function QuizTitle({
  questionNumber,
  questionTitle,
}: QuizTitleProps) {
  return (
    <div className="px-1">
      <h2 className="text-base font-semibold leading-6 tracking-tight text-foreground">
        {questionNumber ? (
          <span className="mr-1.5 text-lg leading-7 text-primary">
            {`Q${questionNumber}.`}
          </span>
        ) : null}
        {questionTitle}
      </h2>
    </div>
  );
}
