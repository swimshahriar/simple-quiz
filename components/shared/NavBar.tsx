import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserRoles } from '@/config/constants';
import { routes } from '@/config/routes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="container px-4 md:px-0 navbar p-0">
      <div className="flex-1">
        <Link href={routes.home} className="text-xl font-bold">
          Simple Quiz
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={routes.home}>Home</Link>
          </li>

          {session?.user?.role === UserRoles.ADMIN ? (
            <li>
              <Link href={routes.manageQuestions}>Manage Questions</Link>
            </li>
          ) : (
            <li>
              <Link href={routes.answers}>Answers</Link>
            </li>
          )}

          {session ? (
            <li>
              <Link href={routes.logout}>Logout</Link>
            </li>
          ) : (
            <li>
              <Link href={routes.login}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
