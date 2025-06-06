import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateUniqueId } from '../Utilities/GenerateId';
import  Task  from '../Types/Task.Types'; 


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
      const newTask = { ...action.payload, id: generateUniqueId() };
      state.value.push(newTask);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.value.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        if (state.value[index].userEmail === action.payload.userEmail) {
        state.value[index] = action.payload;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;