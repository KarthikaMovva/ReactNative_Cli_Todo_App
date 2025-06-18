import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, StyleSheet } from 'react-native';
import HomeScreen from '../Screens/HomeScreen';
import AddTaskScreen from '../Screens/AddTaskScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import { TabParamList } from '../Types/Navigation';
import { getTabBarIcon } from '../Utilities/Utilities';
import MenuButton from '../Components/MenuButton';
import TopTabNavigator from './TopTabBar';
import { AppColorsType } from '../Utilities/Colors';
import { ThemeContext } from '../Auth/ThemeContext';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { requiredColors } = ThemeContext();
  const statusBarBarStyle = requiredColors ? 'light-content' : 'dark-content';
  const statusBarBackgroundColor = requiredColors.MovieCardBackground;

  return (
    <>
      <StatusBar
        barStyle={statusBarBarStyle}
        backgroundColor={statusBarBackgroundColor}
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerLeft: () => <MenuButton />,
          tabBarIcon: getTabBarIcon(route.name),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: styles(requiredColors).background,
          headerShown: true,
          headerStyle: styles(requiredColors).background,
          headerTitleStyle: styles(requiredColors).title,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="AddTask" component={AddTaskScreen} />
        <Tab.Screen name="Movie" component={TopTabNavigator} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
};

const styles = (requiredColors:AppColorsType) => StyleSheet.create({
  background:{
    backgroundColor: requiredColors.MovieCardBackground,
  },
  title:{
    color: requiredColors.darkText,
  },
});

export default TabNavigator;
