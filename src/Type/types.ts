export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  userEmail: string; 
}


export type RootStackParamList = {
  HomeScreen: undefined;
  AddTaskScreen: undefined;
  SettingsScreen : undefined;
  Signup : undefined;
  Login : undefined;
  Drawer : undefined;
};
