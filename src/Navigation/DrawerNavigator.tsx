import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { RootDrawerParamList } from '../Types/Navigation';
import DrawerContent from './DrawerContent'; 
import { ThemeContext } from '../Auth/ThemeContext';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
  const {isDarkTheme} = ThemeContext();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false,
        drawerStyle: styles(isDarkTheme).background
       }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const styles = (isDarkTheme:boolean) => StyleSheet.create({

  background:{
    backgroundColor : isDarkTheme? "black":"white"
  }

})

export default DrawerNavigator;
