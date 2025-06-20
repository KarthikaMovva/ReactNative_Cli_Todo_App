import { ImageSourcePropType } from 'react-native';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface TaskState {
  value: Task[];
}

export interface RegisteredUser {
  email: string;
  password: string;
  token: string;
  profileImage : ImageSourcePropType;
  theme : boolean;
}

export interface UserState {
  users: RegisteredUser[];
  currentUser: RegisteredUser | null;
  error: string | null;
}

