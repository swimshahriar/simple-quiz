import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simple Quiz | Manage Questions',
  description: 'Create, Read, Update and Delete Quiz Questions.',
};

export default function ManageQuestionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
