import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigation.Types';
import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { useAuth } from '../Auth/AuthContext';
import isValidEmail from '../Utilities/IsValidEmail';
import Colors from '../Utilities/Colors';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import WarningModal from '../Components/WarningModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');

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

        try {
            login();
        } catch (err: any) {
            setWarningMessage(err.message || 'Login failed');
            setShowWarningModal(true);
        }
    };

    const handleCloseWarning = () => {
        setShowWarningModal(false);
        setWarningMessage('');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <WarningModal
                visible={showWarningModal}
                message={warningMessage}
                onClose={handleCloseWarning}
            />

            <Text style={styles.title}>Login</Text>
            <CustomInput
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
            />
            <CustomInput
                placeholder='Enter Password'
                value={password}
                onChangeText={setPassword}
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
    input: {
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.inputBorder,
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
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
