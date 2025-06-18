import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ToggleSwitchProps } from '../Types/Props';
import { ThemeContext } from '../Auth/ThemeContext';


const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, value, onValueChange }) => {
  const { isDarkTheme } = ThemeContext();
  return (
    <View style={styles(isDarkTheme).container}>
      <Text style={styles(isDarkTheme).label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={'#f4f3f4'}
      />
    </View>
  );
};

const styles = (isDarkTheme: boolean) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginHorizontal: 10,
    fontSize: 16,
    color: isDarkTheme ? "white" : "black"
  },
});

export default ToggleSwitch;
