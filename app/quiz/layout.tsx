'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const QuizLayout = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default QuizLayout;
