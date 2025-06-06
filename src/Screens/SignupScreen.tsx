import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/Navigation.Types';
import { useAuth } from '../Auth/AuthContext';

import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import WarningModal from '../Components/WarningModal';
import isValidEmail from '../Utilities/IsValidEmail';
import Colors from '../Utilities/Colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const { signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');

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
                placeholder='Enter Password'
                value={password}
                onChangeText={setPassword}
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
