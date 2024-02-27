import { User } from './users';

export type UserAnswer = {
  currentAnswer: string;
  previousAnswers: string[];
};

export type Answer = Record<User['username'], UserAnswer>;

export type QuestionFormat = {
  id: number;
  question: string;
  answers: Answer;
};

export const mockQuestions: QuestionFormat[] = [
  {
    id: 1,
    question: 'How many legs does a spider have?',
    answers: {},
  },
  {
    id: 2,
    question: 'How many bones are in the human body?',
    answers: {},
  },
  {
    id: 3,
    question: 'If you freeze water, what do you get?',
    answers: {},
  },
  {
    id: 4,
    question: 'How many planets are in our solar system?',
    answers: {},
  },
  {
    id: 5,
    question: 'What fruit do kids traditionally give to teachers?',
    answers: {},
  },
];
