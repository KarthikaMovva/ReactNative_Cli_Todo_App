import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CustomButtonProps } from '../Types/Props';
import { useThemeContext } from '../Auth/ThemeContext';
import { AppColorsType } from '../Utilities/Colors';

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPress }) => {
const { requiredColors } = useThemeContext();
  return (
    <TouchableOpacity style={styles(requiredColors).button} onPress={onPress}>
      <Text style={styles(requiredColors).buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = (requiredColors:AppColorsType)=>StyleSheet.create({
  button: {
    backgroundColor: requiredColors.brightBlue,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical : 15,
  },
  buttonText: {
    color: requiredColors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
