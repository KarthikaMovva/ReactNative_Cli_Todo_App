import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, RegisteredUser } from '../Types/Redux.Types';

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupUser: (state, action: PayloadAction<RegisteredUser>) => {
      const existingUser = state.users.find(user => user.email === action.payload.email);
      if (!existingUser) {
        state.users.push(action.payload);
      } else {
        throw new Error('User already exists, please login instead.');
      }
    },
    loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const user = state.users.find(user => user.email === action.payload.email);
      if (!user) {
        throw new Error('User not found, please sign up.');
      }
      if (user.password !== action.payload.password) {
        throw new Error('Incorrect password.');
      }
    },
  },
});

export const { signupUser, loginUser } = userSlice.actions;
export default userSlice.reducer;
