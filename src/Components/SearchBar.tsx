import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { SearchBarProps } from '../Types/Props';
import { AppColorsType } from '../Utilities/Colors';
import { useThemeContext } from '../Auth/ThemeContext';

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Search...' }) => {
  const { requiredColors } = useThemeContext();

  return (
    <View style={styles(requiredColors).container}>
      <TextInput
        style={styles(requiredColors).input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={requiredColors.darkText}
      />
    </View>
  );
};

const styles = (requiredColors:AppColorsType) => StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  input: {
    backgroundColor: requiredColors.MovieCardBackground,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: requiredColors.darkText,
    borderWidth : 1,
    borderColor: requiredColors.lightGray,
  },
});

export default SearchBar;
