'use client';

import Modal from '@/components/Modal';
import Question from '@/components/Question';
import Loader from '@/components/shared/Loader';
import { UserRoles } from '@/config/constants';
import { routes } from '@/config/routes';
import { QuestionFormat } from '@/db/questions';
import { useQuizStore } from '@/store/quizStore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Mode = 'Create' | 'Update';

const ManageQuestionsPage = () => {
  const { status, data } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<Mode>('Create');
  const [currentQuestion, setCurrentQuestion] = useState<QuestionFormat | null>(
    null
  );
  const [inputText, setInputText] = useState('');

  const questions = useQuizStore((state) => state.questions);
  const addQuestion = useQuizStore((state) => state.addQuestion);
  const updateQuestion = useQuizStore((state) => state.updateQuestion);
  const deleteQuestion = useQuizStore((state) => state.deleteQuestion);
  const loadQuestions = useQuizStore((state) => state.loadQuestions);

  const submitHandler = () => {
    if (currentMode === 'Create') {
      const question: QuestionFormat = {
        id: Number(new Date()),
        question: inputText,
        answers: {},
      };
      addQuestion(question);
    } else if (currentMode === 'Update' && currentQuestion) {
      const question: QuestionFormat = {
        ...currentQuestion,
        question: inputText,
      };
      updateQuestion(question);
    }

    setIsOpen(false);
    setInputText('');
    setCurrentMode('Create');
  };

  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <section className="flex flex-col gap-12 pt-8">
      <h1 className="text-4xl uppercase text-center">Manage Questions</h1>

      <div className="text-center">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Add New
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {questions.length ? (
          questions.map((question, index) => (
            <div
              key={question.id}
              className="shadow hover:shadow-md rounded ring-1 hover:ring-2 px-8 py-6"
            >
              <Question index={index} question={question} />

              <div className="flex items-center gap-4 pt-3 flex-wrap">
                <button className="btn btn-info btn-sm" type="button">
                  View Answers
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                  onClick={() => {
                    setCurrentMode('Update');
                    setCurrentQuestion(question);
                    setInputText(question.question);
                    setTimeout(() => setIsOpen(true));
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  type="button"
                  onClick={() => {
                    const isConfirm = confirm(
                      'Are you sure you want to delete this question?'
                    );

                    if (isConfirm) {
                      deleteQuestion(question.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-2xl text-center">No Questions Added Yet!</h3>
        )}
      </div>

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          title={`${currentMode} Question`}
        >
          <div className="flex flex-col gap-4">
            <textarea
              name="question"
              id="question"
              rows={4}
              className="textarea textarea-bordered w-full"
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
            />

            <div className="text-right">
              <button
                className="btn btn-primary"
                type="button"
                onClick={submitHandler}
              >
                {currentMode}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ManageQuestionsPage;
