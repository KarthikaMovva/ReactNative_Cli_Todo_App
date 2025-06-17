import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleSwitch from '../Components/ToggelSwitch';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Utilities/Colors';
import { ThemeContext } from '../Auth/ThemeContext';

const SettingsScreen = () => {
  const { isDarkTheme, setisDarkTheme } = ThemeContext();

  console.log(isDarkTheme, "from settings screen")

  return (
    <View style={styles(isDarkTheme).screenContainer}>
      <Ionicons name="person-circle" size={130} color="#4F8EF7" />
      <ToggleSwitch
        label='Turn on dark theme'
        value={isDarkTheme}
        onValueChange={(val) => setisDarkTheme(val)}
      />
    </View>
  );
};

const styles = (isDarkTheme: boolean) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDarkTheme ? Colors.darkTheme.darkBackground : Colors.background
  }
});

export default SettingsScreen;
