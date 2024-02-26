import { ADMIN_USERNAME, UserRoles } from '@/config/constants';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials) {
          return null;
        }

        const user = {
          username: credentials.username,
          password: credentials.password,
          role:
            credentials.username === ADMIN_USERNAME
              ? UserRoles.ADMIN
              : UserRoles.USER,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = token.user;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
