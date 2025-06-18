import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootStackParamList } from '../Types/Navigation';
import { RootState } from '../Redux/store';
import { signupUser } from '../Redux/UserSlice';
import axiosInstance from '../Network/AxiosInstance';
import Profile from '../Assets/Profile.png';

import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import Title from '../Components/Title';

import { isValidEmail } from '../Utilities/Utilities';
import { AppColorsType } from '../Utilities/Colors';
import { useContextValues } from '../Auth/ModalContext';
import { Endpoints } from '../Network/Endpoints';
import { ThemeContext } from '../Auth/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { requiredColors } = ThemeContext();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const {
    setShowWarning,
    setWarningMessage,
    setIsConfirm,
  } = useContextValues();

  const handleSignup = async () => {
    setIsConfirm(false);

    if (!email.trim() || !password.trim()) {
      setWarningMessage('Please enter both email and password.');
      setShowWarning(true);
      return;
    }

    if (!isValidEmail(email)) {
      setWarningMessage('Please enter a valid email address.');
      setShowWarning(true);
      return;
    }

    if (password.length < 5) {
      setWarningMessage('Password must be at least 5 characters long.');
      setShowWarning(true);
      return;
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      setWarningMessage('User already exists. Please log in instead.');
      setShowWarning(true);
      return;
    }

    try {
      const response = await axiosInstance.get(Endpoints.signup);
      const token = response.data.request_token;
      dispatch(signupUser({ email, password, token, profileImage: Profile }));
    } catch (error: any) {
      console.error('API Error:', error);
      setWarningMessage(
        error?.response?.data?.status_message || 'Failed to authenticate.'
      );
      setShowWarning(true);
    }
  };

  return (
    <View style={styles(requiredColors).container}>
      <Title heading="Signup" />
      <CustomInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Title
        heading="Already have an account? Log in"
        onPress={() => navigation.goBack()}
        style={styles(requiredColors).switchText}
      />
      <CustomButton onPress={handleSignup} text="Signup" />
    </View>
  );
};

const styles = (requiredColors:AppColorsType)=>StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40,
    backgroundColor: requiredColors.signupBackground,
  },
  switchText: {
    fontSize: 14,
    color: requiredColors.brightBlue,
    textDecorationLine: 'underline',
    marginVertical: 20,
  },
});

export default SignupScreen;
