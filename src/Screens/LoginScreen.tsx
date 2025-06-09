import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigation.Types';
import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../Redux/store';
import { useAuth } from '../Auth/AuthContext';

import isValidEmail from '../Utilities/IsValidEmail';
import Colors from '../Utilities/Colors';
import CustomInput from '../Components/CustomInput';
import Title from '../Components/Title';
import CustomButton from '../Components/CustomButton';
import SwitchText from '../Components/SwitchText';
import WarningModal from '../Components/WarningModal';
import axiosInstance from '../Network/AxiosInstance';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');

    const { setIsLoggedIn, setCurrentUserEmail } = useAuth();
    const users = useSelector((state: RootState) => state.users.users);

    const handleLogin = async () => {
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

        try {
            const response = await axiosInstance.get('/authentication');
            const tokenFromAPI = response.data.request_token;

            const user = users.find(
                u => u.email === email && u.password === password && u.token === tokenFromAPI
            );

            if (!user) {
                setWarningMessage('Invalid credentials or token mismatch.');
                setShowWarningModal(true);
                return;
            }

            setIsLoggedIn(true);
            setCurrentUserEmail(email);
        } catch (error: any) {
            console.error('API Error:', error);
            setWarningMessage('Failed to authenticate. Please try again.');
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

            <SwitchText text='Do not have an account? Signup' onPress={() => { navigation.navigate('Signup') }} />

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
    }
});

export default LoginScreen;
