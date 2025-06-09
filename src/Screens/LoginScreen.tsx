import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigation.Types';
import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../Redux/UserSlice';
import { RootState } from '../Redux/store';
import { useAuth } from '../Auth/AuthContext';

import isValidEmail from '../Utilities/IsValidEmail';
import Colors from '../Utilities/Colors';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import WarningModal from '../Components/WarningModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const dispatch = useDispatch();
  const { setIsLoggedIn, setCurrentUserEmail } = useAuth();
  const users = useSelector((state: RootState) => state.users.users);

  const handleLogin = () => {
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

    const user = users.find(user => user.email === email);
    if (!user) {
      setWarningMessage('User not found. Please sign up.');
      setShowWarningModal(true);
      return;
    }

    if (user.password !== password) {
      setWarningMessage('Incorrect password.');
      setShowWarningModal(true);
      return;
    }

    dispatch(loginUser({ email, password }));
    setIsLoggedIn(true);
    setCurrentUserEmail(email);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WarningModal
        visible={showWarningModal}
        message={warningMessage}
        onClose={() => setShowWarningModal(false)}
      />

      <Text style={styles.title}>Login</Text>
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

      <Text onPress={() => navigation.navigate('Signup')} style={styles.switchText}>
        Don’t have an account? Sign up
      </Text>

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
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: Colors.darkText,
  },
  switchText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.loginSwitchtext,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
});

export default LoginScreen;
