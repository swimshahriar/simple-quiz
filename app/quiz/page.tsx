'use client';

import Question from '@/components/Question';
import Loader from '@/components/shared/Loader';
import { UserRoles } from '@/config/constants';
import { routes } from '@/config/routes';
import { UserAnswer, QuestionFormat } from '@/db/questions';
import { useQuizStore } from '@/store/quizStore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type LocalAnswer = Record<QuestionFormat['id'], UserAnswer['currentAnswer']>;

const QuizPage = () => {
  const { status, data } = useSession();
  const router = useRouter();

  const questions = useQuizStore((state) => state.questions);
  const loadQuestions = useQuizStore((state) => state.loadQuestions);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);

  const [answers, setAnswers] = useState<LocalAnswer>({});

  const setLocalAnswerInitialData = useCallback(() => {
    const answers: LocalAnswer = {};
    const username = data?.user?.username;

    if (!username) {
      return;
    }

    questions.forEach((question) => {
      const userAnswer = question.answers[username]?.currentAnswer;
      answers[question.id] = userAnswer || '';
    });

    setAnswers(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user?.username]);

  useEffect(() => {
    loadQuestions();
    setLocalAnswerInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (
    status !== 'authenticated' ||
    !data.user ||
    data.user.role !== UserRoles.USER
  ) {
    router.push(routes.accessDenied);
    return null;
  }

  return (
    <section className="flex flex-col justify-center gap-8 py-8">
      <h1 className="text-4xl font-bold uppercase text-center">Quiz</h1>

      {questions.length ? (
        <div className="flex flex-col gap-4">
          {questions.map((question, index) => {
            return (
              <div
                key={question.id}
                className="shadow hover:shadow-md rounded ring-1 hover:ring-2 px-8 py-6"
              >
                <Question index={index} question={question} />

                <div className="flex gap-4 pt-3 flex-wrap">
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-md"
                    value={answers[question.id]}
                    onChange={(event) => {
                      setAnswers((previousAnswers) => {
                        return {
                          ...previousAnswers,
                          [question.id]: event.target.value,
                        };
                      });
                    }}
                  />

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      const answer = answers[question.id];

                      if (!answer || !answer.trim().length) {
                        alert('Please provide an answer!');
                        return;
                      }

                      if (data?.user?.username) {
                        answerQuestion(question.id, answer, data.user.username);
                        alert('Success!');
                      }
                    }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      const username = data?.user?.username;

                      if (!username) {
                        return;
                      }

                      const userAnswer = question.answers[username];
                      if (!userAnswer || !userAnswer.previousAnswers) {
                        return;
                      }

                      const previousAnswers =
                        userAnswer.previousAnswers.join(', ') ||
                        'No previous answers found!';

                      alert('Previous Answers: \n' + previousAnswers);
                    }}
                  >
                    Previous Answers
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3 className="text-2xl text-center">No Questions Added Yet!</h3>
      )}
    </section>
  );
};

export default QuizPage;
