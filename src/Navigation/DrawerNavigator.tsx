import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { RootDrawerParamList } from '../Types/Navigation';
import DrawerContent from './DrawerContent'; 
import { ThemeContext } from '../Auth/ThemeContext';
import { StyleSheet } from 'react-native';
import { AppColorsType } from '../Utilities/Colors';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = () => {
  const {requiredColors} = ThemeContext();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false,
        drawerStyle: styles(requiredColors).background
       }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const styles = (requiredColors:AppColorsType) => StyleSheet.create({

  background:{
    backgroundColor : requiredColors.background,
  },

});

export default DrawerNavigator;
