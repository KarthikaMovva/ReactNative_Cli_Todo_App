import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootStackParamList } from '../Types/Navigation';
import { RootState } from '../Redux/store';
import { signupUser } from '../Redux/UserSlice';
import axiosInstance from '../Network/AxiosInstance';

import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import Title from '../Components/Title';

import { isValidEmail } from '../Utilities/IdAndMails';
import Colors from '../Utilities/Colors';
import { useContextvalues } from '../Auth/ModalContext';
import { Endpoints } from '../Network/Endpoints';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const {
    setshowWarning,
    setwarningMessage,
    setIsConfirm,
  } = useContextvalues();

  const handleSignup = async () => {
    setIsConfirm(false);

    if (!email.trim() || !password.trim()) {
      setwarningMessage('Please enter both email and password.');
      setshowWarning(true);
      return;
    }

    if (!isValidEmail(email)) {
      setwarningMessage('Please enter a valid email address.');
      setshowWarning(true);
      return;
    }

    if (password.length < 5) {
      setwarningMessage('Password must be at least 5 characters long.');
      setshowWarning(true);
      return;
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      setwarningMessage('User already exists. Please log in instead.');
      setshowWarning(true);
      return;
    }

    try {
      const response = await axiosInstance.get(Endpoints.signup);
      const token = response.data.request_token;
      dispatch(signupUser({ email, password, token }));
    } catch (error: any) {
      console.error('API Error:', error);
      setwarningMessage(
        error?.response?.data?.status_message || 'Failed to authenticate.'
      );
      setshowWarning(true);
    }
  };

  return (
    <View style={styles.container}>
      <Title heading='Signup' />
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
        heading='Already have an account? Log in'
        onPress={() => navigation.goBack()}
        style={styles.switchText}
      />
      <CustomButton onPress={handleSignup} text="Signup" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40,
    backgroundColor: Colors.signupBackground,
  },
  switchText: {
    fontSize: 14,
    color: Colors.signupSwitchText,
    textDecorationLine: 'underline',
    marginVertical: 20,
  },
});

export default SignupScreen;
