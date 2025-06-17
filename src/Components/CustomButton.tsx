import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CustomButtonProps } from '../Types/Props';
import Colors from '../Utilities/Colors';

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryButton,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
