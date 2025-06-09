import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigation.Types';

import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../Redux/UserSlice';
import { RootState } from '../Redux/store';

import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
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

  const handleSignup = () => {
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
      setWarningMessage('User already exists. Please log in.');
      setShowWarningModal(true);
      return;
    }

    dispatch(signupUser({ email, password }));
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

      <Text style={styles.title}>Sign Up</Text>

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

      <Text onPress={() => navigation.navigate('Login')} style={styles.switchText}>
        Already have an account? Log in
      </Text>

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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: Colors.signupTitle,
  },
  switchText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.signupSwitchText,
    textDecorationLine: 'underline',
    marginBottom: 25,
  },
});

export default SignupScreen;
