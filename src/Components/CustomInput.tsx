import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../Utilities/Colors';
import { CustomInputProps } from '../Types/Props';
import { ThemeContext } from '../Auth/ThemeContext';

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false, 
  ...rest
}) => {
  const { isDarkTheme } = ThemeContext();
  return (
    <TextInput
      style={styles(isDarkTheme).input}
      placeholder={placeholder}
      placeholderTextColor={isDarkTheme? Colors.loginBackground: Colors.mediumText}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      {...rest}
    />
  );
};

const styles = (isDarkTheme:boolean) => StyleSheet.create({
  input: {
    backgroundColor: isDarkTheme? Colors.darkTheme.cardsBackground: Colors.loginBackground,
    borderColor: Colors.signupInputBorder,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginVertical: 15,
    fontSize: 16,
    color: isDarkTheme? Colors.loginBackground: Colors.darkText,
  },
});

export default CustomInput;
