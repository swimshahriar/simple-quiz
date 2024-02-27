import { QuestionFormat } from '@/db/questions';

type QuestionProps = {
  question: QuestionFormat;
  index: number;
};

const Question = ({ question, index }: QuestionProps) => {
  return (
    <p className="text-3xl">
      {index + 1}. {question.question}
    </p>
  );
};

export default Question;
