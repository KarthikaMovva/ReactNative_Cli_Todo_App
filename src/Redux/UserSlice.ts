import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, RegisteredUser } from '../Types/Redux';

const initialState: UserState = {
  users: [],
  currentUser: null,
  error : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupUser: (state, action: PayloadAction<RegisteredUser>) => {
      const existingUser = state.users.find(user => user.email === action.payload.email);
      if (!existingUser) {
        state.users.push(action.payload);
        state.currentUser = action.payload;
        state.error = null;
      } else {
        state.error = 'User already exists. Please login instead.';
      }
    },
    loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const user = state.users.find(users => users.email === action.payload.email);
      if (!user) {
        state.error = 'User not found. Please sign up.';
        state.currentUser = null;
        return;
      }
      if (user.password !== action.payload.password) {
        state.error = 'Incorrect password.';
        state.currentUser = null;
        return;
      }
      state.currentUser = user;
      state.error = null;
    },
     logoutUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const { signupUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
