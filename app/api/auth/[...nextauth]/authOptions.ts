import { User, mockUsers } from '@/db/users';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '*******',
        },
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

        return {
          id: userInfo.id,
          username: userInfo.username,
          role: userInfo.role,
        };
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
        session.user = token.user as Omit<User, 'password'>;
      }

      return session;
    },
  },
};
