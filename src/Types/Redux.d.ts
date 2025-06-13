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
}

export interface UserState {
  users: RegisteredUser[];
  currentUser: RegisteredUser | null;
  error: string | null;
}