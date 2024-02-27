'use client';

import Loader from '@/components/shared/Loader';
import { UserRoles } from '@/config/constants';
import { routes } from '@/config/routes';
import { useQuizStore } from '@/store/quizStore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const AnswersPage = () => {
  const { status, data } = useSession();
  const router = useRouter();
  const params = useParams<{ qid: string }>();

  const questions = useQuizStore((state) => state.questions);
  const loadQuestions = useQuizStore((state) => state.loadQuestions);

  const question = useMemo(() => {
    return questions.find((q) => String(q.id) === params.qid);
  }, [params.qid, questions]);

  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (
    status !== 'authenticated' ||
    !data.user ||
    data.user.role !== UserRoles.ADMIN
  ) {
    router.push(routes.accessDenied);
    return null;
  }

  return (
    <section className="flex flex-col justify-center gap-8 py-8">
      <h1 className="text-4xl font-bold uppercase text-center">Answers</h1>

      <div className="text-center">
        <Link href={routes.manageQuestions} className="btn btn-outline">
          👈 Go Back
        </Link>
      </div>

      {question ? (
        <div>
          <h3 className="text-2xl">
            <span className="font-bold">Question: </span>
            {question.question}
          </h3>

          <div className="flex flex-col gap-4 flex-wrap py-4">
            {Object.entries(question.answers).map(([username, answers]) => {
              return (
                <div
                  key={username}
                  className="flex gap-2 shadow ring-1 rounded p-2 text-lg"
                >
                  <p>
                    <span className="font-bold">Answer:</span>{' '}
                    {answers.currentAnswer}
                  </p>
                  <p>
                    <span className="font-bold">Answered By:</span> {username}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>No Question Found!</p>
      )}
    </section>
  );
};

export default AnswersPage;
