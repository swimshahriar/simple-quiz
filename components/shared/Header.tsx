import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="navbar">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Simple Quiz
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/manage-questions">Manage Questions</Link>
          </li>

          <li>
            <Link href="/answers">Answers</Link>
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
    </header>
  );
};

export default Header;
