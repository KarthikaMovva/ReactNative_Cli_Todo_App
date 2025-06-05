import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Utilities/Colors'; 

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.lightGray, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.darkText,
  },
});

export default SettingsScreen;
