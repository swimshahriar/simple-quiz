export const routes = {
  home: '/',
  answers: '/answers',
  manageQuestions: '/manage-questions',
  accessDenied: '/access-denied',
  login: '/api/auth/signin',
  logout: '/api/auth/signout?callbackUrl=/',
  quiz: '/quiz',
} as const;
