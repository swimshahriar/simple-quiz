import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="container navbar p-0">
      <div className="flex-1">
        <Link href="/" className="text-xl">
          Simple Quiz
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Questions</Link>
          </li>

          <li>
            <Link href="/answers">Answers</Link>
          </li>

          <li>
            <Link href="/manage-questions">Manage Questions</Link>
          </li>

          {session ? (
            <li>
              <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            </li>
          ) : (
            <li>
              <Link href="/api/auth/signin">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
