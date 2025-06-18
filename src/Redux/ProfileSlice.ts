import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';
import Profile from '../Assets/Profile.png';
import { ProfileState } from '../Types/Redux';

const initialState: ProfileState = {
  profileImage: Profile,
};

const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileImage: (state, action: PayloadAction<ImageSourcePropType>) => {
      state.profileImage = action.payload;
    },

  },
});

export const { setProfileImage } = ProfileSlice.actions;

export default ProfileSlice.reducer;
