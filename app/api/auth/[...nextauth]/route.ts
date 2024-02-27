import { mockUsers } from '@/db/users';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: (credentials, req) => {
        if (!credentials) {
          return null;
        }

        const userInfo = mockUsers.find(
          (user) => user.username === credentials.username.toLowerCase()
        );

        if (
          !userInfo ||
          (userInfo && userInfo.password !== credentials.password)
        ) {
          return null;
        }

        return userInfo;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user = token.user;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
