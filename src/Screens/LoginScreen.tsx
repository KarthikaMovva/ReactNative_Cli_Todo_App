import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../Auth/authContext';
import Colors from '../Utilities/Colors';
import WarningModal from '../Components/WarningModal';

const LoginScreen: React.FC = () => {
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

        if (password.length < 5) {
            setWarningMessage('Password must be at least 5 characters long.');
            setShowWarningModal(true);
            return;
        }

        login();
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
            <Button title="Login" onPress={handleLogin} color={Colors.primaryButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: Colors.darkText,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.inputBorder,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        color: Colors.darkText,
        backgroundColor: Colors.lightGray,
    },
});

export default LoginScreen;