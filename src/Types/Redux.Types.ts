export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  userEmail: string; 
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
}