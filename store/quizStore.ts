import { LocalStorageKeys } from '@/config/constants';
import { QuestionFormat, mockQuestions } from '@/db/questions';
import { User } from '@/db/users';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/utils';
import { create } from 'zustand';

type QuizStore = {
  questions: QuestionFormat[];
  loadQuestions: () => void;
  addQuestion: (question: QuestionFormat) => void;
  updateQuestion: (question: QuestionFormat) => void;
  deleteQuestion: (questionId: QuestionFormat['id']) => void;
  answerQuestion: (
    questionId: QuestionFormat['id'],
    answer: string,
    username: User['username']
  ) => void;
};

export const useQuizStore = create<QuizStore>()((set) => ({
  questions: [],
  loadQuestions: () =>
    set((state) => {
      const questions = getFromLocalStorage(LocalStorageKeys.QUESTIONS);

      if (!questions) {
        setToLocalStorage(
          LocalStorageKeys.QUESTIONS,
          JSON.stringify(mockQuestions)
        );

        return {
          ...state,
          questions: mockQuestions,
        };
      }

      const questionsArray: QuestionFormat[] = JSON.parse(questions);

      return { ...state, questions: questionsArray };
    }),
  addQuestion: (question) =>
    set((state) => {
      const questions = [...state.questions, question];

      setToLocalStorage(LocalStorageKeys.QUESTIONS, JSON.stringify(questions));

      return { ...state, questions };
    }),
  updateQuestion: (question) =>
    set((state) => {
      const questions = state.questions.map((q) => {
        if (q.id === question.id) {
          return question;
        }

        return q;
      });

      setToLocalStorage(LocalStorageKeys.QUESTIONS, JSON.stringify(questions));

      return { ...state, questions };
    }),
  deleteQuestion: (questionId) =>
    set((state) => {
      const questions = state.questions.filter((q) => q.id !== questionId);
      setToLocalStorage(LocalStorageKeys.QUESTIONS, JSON.stringify(questions));

      return { ...state, questions };
    }),
  answerQuestion: (questionId, answer, username) =>
    set((state) => {
      const targetQuestion = state.questions.find((q) => q.id === questionId);

      if (!targetQuestion) {
        return state;
      }

      const answers = targetQuestion.answers;
      const userAnswers = answers[username];

      if (userAnswers && userAnswers.currentAnswer) {
        const currentAnswer = userAnswers.currentAnswer;
        userAnswers.previousAnswers.unshift(currentAnswer);
        userAnswers.currentAnswer = answer;
      } else {
        answers[username] = {
          currentAnswer: answer,
          previousAnswers: [],
        };
      }

      const questions = state.questions.map((q) => {
        if (q.id === questionId) {
          return targetQuestion;
        }

        return q;
      });

      setToLocalStorage(LocalStorageKeys.QUESTIONS, JSON.stringify(questions));

      return { ...state, questions: questions };
    }),
}));
