'use client';

import Modal from '@/components/Modal';
import Question from '@/components/Question';
import { useState } from 'react';

const questions = [
  {
    id: 1,
    question: 'What is the capital of France?',
  },
  { id: 2, question: 'What is the capital of Germany?' },
  { id: 3, question: 'What is the capital of Italy?' },
];

type Mode = 'Create' | 'Update';

const ManageQuestionsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<Mode>('Create');

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
        {questions.map((question, index) => (
          <Question key={question.id} index={index} question={question} />
        ))}
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
            />

            <div className="text-right">
              <button className="btn btn-primary" type="button">
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
