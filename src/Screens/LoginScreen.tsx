import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Type/types';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../Auth/authContext';
import Colors from '../Utilities/Colors';
import WarningModal from '../Components/WarningModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { email, setEmail, password, setPassword, login } = useAuth();
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

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
        } catch (err:any) {
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
            <WarningModal
                visible={showWarningModal}
                message={warningMessage}
                onClose={handleCloseWarning}
            />

            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor={Colors.mediumText}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor={Colors.mediumText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <Text onPress={() => navigation.navigate('Signup')} style={styles.switchText}>
                Don’t have an account? Sign up
            </Text>

            <Button title="Login" onPress={handleLogin} color={Colors.primaryButton} />
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
