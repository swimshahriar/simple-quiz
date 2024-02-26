export type Question = {
  id: number;
  question: string;
};

type QuestionProps = {
  question: Question;
  index: number;
};

const Question = ({ question, index }: QuestionProps) => {
  return (
    <p className="text-xl">
      {index + 1}. {question.question}
    </p>
  );
};

export default Question;
