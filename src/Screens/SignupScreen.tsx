import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useAuth } from '../Auth/authContext';
import WarningModal from '../Components/WarningModal';
import Colors from '../Utilities/Colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const { email, setEmail, password, setPassword, signup } = useAuth();
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

        try {
            signup();
        } catch (err: any) {
            setWarningMessage(err.message || 'Signup failed');
            setShowWarningModal(true);
        }
    };

    return (
        <View style={styles.container}>
            <WarningModal
                visible={showWarningModal}
                message={warningMessage}
                onClose={() => setShowWarningModal(false)}
            />

            <Text style={styles.title}>Sign Up</Text>
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

            <Text onPress={() => navigation.navigate('Login')} style={styles.switchText}>
                Already have an account? Log in
            </Text>
            <Button title="Sign Up" onPress={handleSignup} color={Colors.primaryButton} />
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
    input: {
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.signupInputBorder,
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        color: Colors.signupInputcolor,
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
