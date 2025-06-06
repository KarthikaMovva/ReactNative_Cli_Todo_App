import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../Utilities/Colors';
import { CustomInputProps } from '../Types/Props.Types';

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  ...rest
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Colors.mediumText}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.lightGray,
    borderColor : Colors.darkText,
    borderWidth : 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.darkText,
  },
});

export default CustomInput;
