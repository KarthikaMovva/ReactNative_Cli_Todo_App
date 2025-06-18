import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigation';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../Redux/store';
import { loginUser } from '../Redux/UserSlice';

import { isValidEmail } from '../Utilities/Utilities';
import { AppColorsType } from '../Utilities/Colors';
import CustomInput from '../Components/CustomInput';
import Title from '../Components/Title';
import CustomButton from '../Components/CustomButton';
import axiosInstance from '../Network/AxiosInstance';
import { Endpoints } from '../Network/Endpoints';
import { useContextValues } from '../Auth/ModalContext';
import { ThemeContext } from '../Auth/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
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

  const handleLogin = async () => {
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

    try {
      const response = await axiosInstance.get(Endpoints.signup);
      const tokenFromAPI = response.data.request_token;

      const user = users.find(
        u => u.email === email && u.password === password && u.token === tokenFromAPI
      );

      if (!user) {
        setWarningMessage('Invalid credentials or token mismatch.');
        setShowWarning(true);
        return;
      }

      dispatch(loginUser({ email, password }));
    } catch (error: any) {
      console.error('API Error:', error);
      setWarningMessage('Failed to authenticate. Please try again.');
      setShowWarning(true);
    }
  };

  return (
    <View style={styles(requiredColors).container}>

      <Title heading="Login" />

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
        heading="Do not have an account? Signup"
        onPress={() => navigation.navigate('Signup')}
        style={styles(requiredColors).switchText}
      />

      <CustomButton onPress={handleLogin} text="Login" />
    </View>
  );
};

const styles = (requiredColors:AppColorsType)=>StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40,
    backgroundColor: requiredColors.background,
  },
   switchText: {
    fontSize: 14,
    color: requiredColors.brightBlue,
    textDecorationLine: 'underline',
    marginVertical: 20,
  },
});

export default LoginScreen;
