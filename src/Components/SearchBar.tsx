import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { SearchBarProps } from '../Types/Props';
import Colors from '../Utilities/Colors';
import { ThemeContext } from '../Auth/ThemeContext';

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Search...' }) => {
  const { isDarkTheme } = ThemeContext();

  return (
    <View style={styles(isDarkTheme).container}>
      <TextInput
        style={styles(isDarkTheme).input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={isDarkTheme? Colors.loginBackground: Colors.mediumText}
      />
    </View>
  );
};

const styles = (isDarkTheme:boolean) => StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  input: {
    backgroundColor: isDarkTheme? Colors.darkTheme.cardsBackground: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: isDarkTheme? Colors.loginBackground: Colors.darkText,
  },
});

export default SearchBar;
