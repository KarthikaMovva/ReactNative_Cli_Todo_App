import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigation';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../Redux/store';
import { loginUser } from '../Redux/UserSlice';

import { isValidEmail } from '../Utilities/IdAndMails';
import Colors from '../Utilities/Colors';
import CustomInput from '../Components/CustomInput';
import Title from '../Components/Title';
import CustomButton from '../Components/CustomButton';
import axiosInstance from '../Network/AxiosInstance';
import { Endpoints } from '../Network/Endpoints';
import { useContextvalues } from '../Auth/ModalContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const {
    setshowWarning,
    setwarningMessage,
    setIsConfirm
  } = useContextvalues();

  const handleLogin = async () => {
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

    try {
      const response = await axiosInstance.get(Endpoints.signup);
      const tokenFromAPI = response.data.request_token;

      const user = users.find(
        u => u.email === email && u.password === password && u.token === tokenFromAPI
      );

      if (!user) {
        setwarningMessage('Invalid credentials or token mismatch.');
        setshowWarning(true);
        return;
      }

      dispatch(loginUser({ email, password }));
    } catch (error: any) {
      console.error('API Error:', error);
      setwarningMessage('Failed to authenticate. Please try again.');
      setshowWarning(true);
    }
  };

  return (
    <View style={styles.container}>

      <Title heading='Login' />

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
        heading='Do not have an account? Signup'
        onPress={() => navigation.navigate('Signup')}
        style={styles.switchText}
      />

      <CustomButton onPress={handleLogin} text="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40,
    backgroundColor: Colors.loginBackground,
  },
   switchText: {
    fontSize: 14,
    color: Colors.signupSwitchText,
    textDecorationLine: 'underline',
    marginVertical: 20,
  },
});

export default LoginScreen;
