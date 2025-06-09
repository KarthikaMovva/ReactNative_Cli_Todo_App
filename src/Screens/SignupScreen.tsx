import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { RootStackParamList } from '../Types/Navigation.Types';
import { RootState } from '../Redux/store';
import { signupUser } from '../Redux/UserSlice';
import axiosInstance from '../Network/AxiosInstance';

import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import Title from '../Components/Title';
import SwitchText from '../Components/SwitchText';
import WarningModal from '../Components/WarningModal';
import isValidEmail from '../Utilities/IsValidEmail';
import Colors from '../Utilities/Colors';
import { useAuth } from '../Auth/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const dispatch = useDispatch();
  const { setIsLoggedIn, setCurrentUserEmail } = useAuth();
  const users = useSelector((state: RootState) => state.users.users);

  const handleSignup = async () => {
    if (!email.trim() || !password.trim()) {
      setWarningMessage('Please enter both email and password.');
      setShowWarningModal(true);
      return;
    }

    if (!isValidEmail(email)) {
      setWarningMessage('Please enter a valid email address.');
      setShowWarningModal(true);
      return;
    }

    if (password.length < 5) {
      setWarningMessage('Password must be at least 5 characters long.');
      setShowWarningModal(true);
      return;
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      setWarningMessage('User already exists. Please log in instead.');
      setShowWarningModal(true);
      return;
    }

    try {
      const response = await axiosInstance.get('/authentication');
      const token = response.data.request_token;

      dispatch(signupUser({ email, password, token }));

      setIsLoggedIn(true);
      setCurrentUserEmail(email);
    } catch (error: any) {
      console.error('API Error:', error);
      setWarningMessage(error?.response?.data?.status_message || 'Failed to authenticate.');
      setShowWarningModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WarningModal
        visible={showWarningModal}
        message={warningMessage}
        onClose={() => setShowWarningModal(false)}
      />

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

      <SwitchText text='Already have an account? Log in' onPress={() => { navigation.navigate('Login') }} />

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
  }
});

export default SignupScreen;
