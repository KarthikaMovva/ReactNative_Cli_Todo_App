import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid'; 

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskState {
  value: Task[];
}

const initialState: TaskState = {
  value: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask = { ...action.payload, id: uuid.v4() as string }; 
      state.value.push(newTask);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.value.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
  },
});

export const { addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
