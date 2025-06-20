import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { AppColorsType } from '../Utilities/Colors';
import { CustomInputProps } from '../Types/Props';
import { useThemeContext } from '../Auth/ThemeContext';

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  ...rest
}) => {
  const { requiredColors } = useThemeContext();
  return (
    <TextInput
      style={styles(requiredColors).input}
      placeholder={placeholder}
      placeholderTextColor={requiredColors.mediumText}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      {...rest}
    />
  );
};

const styles = (requiredColors:AppColorsType) => StyleSheet.create({
  input: {
    backgroundColor: requiredColors.MovieCardBackground,
    borderColor: requiredColors.signupBackground,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginVertical: 15,
    fontSize: 16,
    color: requiredColors.darkText,
  },
});

export default CustomInput;
