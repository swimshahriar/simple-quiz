import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { UserRoles } from '@/config/constants';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex flex-col gap-8 justify-center items-center py-8">
      <h1 className="text-4xl">Welcome to Simple Quiz!</h1>

      {!session ? (
        <Link className="btn btn-primary" href={routes.login}>
          Sign in
        </Link>
      ) : session?.user?.role === UserRoles.ADMIN ? (
        <>
          <p className="text-md">Create, Update, Delete Quiz Questions.</p>
          <Link className="btn btn-primary" href={routes.manageQuestions}>
            Manage Questions
          </Link>
        </>
      ) : (
        <>
          <p className="text-md">Answer simple quiz questions.</p>
          <Link className="btn btn-primary" href={routes.quiz}>
            Quiz Questions
          </Link>
        </>
      )}
    </section>
  );
}
