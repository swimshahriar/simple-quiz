'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const AnswersLayout = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AnswersLayout;
