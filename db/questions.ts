export type Answer = Record<string, string[]>;

export type QuestionFormat = {
  id: number;
  question: string;
  answers: Answer; // {[userId]: [answers]}
};

export const mockQuestions: QuestionFormat[] = [
  {
    id: 1,
    question: 'What is React?',
    answers: {}, // {[userId]: [answers]}
  },
  {
    id: 2,
    question: 'What is NextJS?',
    answers: {},
  },
];
