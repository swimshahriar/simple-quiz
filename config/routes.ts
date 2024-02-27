export const routes = {
  home: '/',
  answers: (qid: string) => `/answers/${qid}`,
  manageQuestions: '/manage-questions',
  accessDenied: '/access-denied',
  login: '/api/auth/signin',
  logout: '/api/auth/signout?callbackUrl=/',
  quiz: '/quiz',
} as const;
