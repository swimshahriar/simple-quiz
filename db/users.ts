import { UserRoles } from '@/config/constants';

export type User = {
  id: string;
  username: string;
  password: string;
  role: `${UserRoles}`;
};

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin',
    role: 'admin',
  },
  {
    id: '2',
    username: 'user',
    password: 'user',
    role: 'user',
  },
  {
    id: '3',
    username: 'user2',
    password: 'user2',
    role: 'user',
  },
];
