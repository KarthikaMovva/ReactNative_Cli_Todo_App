import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { SearchBarProps } from '../Types/Props';
import Colors from '../Utilities/Colors';

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Search...' }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.mediumText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
 container : {
  paddingVertical : 5
 },
  input: {
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    color: Colors.darkText,
  },
});

export default SearchBar;