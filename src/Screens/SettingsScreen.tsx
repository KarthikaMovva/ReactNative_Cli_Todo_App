import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Title from '../Components/Title';
import Colors from '../Utilities/Colors'; 

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Title heading='Settings'/>
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
  }
});

export default SettingsScreen;
