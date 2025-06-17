import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../Utilities/Colors';
import { CustomInputProps } from '../Types/Props';

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false, 
  ...rest
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Colors.mediumText}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.loginBackground,
    borderColor: Colors.signupInputBorder,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginVertical: 15,
    fontSize: 16,
    color: Colors.darkText,
  },
});

export default CustomInput;
