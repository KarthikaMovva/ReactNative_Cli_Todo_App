import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MovieScreen from '../Screens/MovieScreen';
import PeopleScreen from '../Screens/PeopleScreen';
import { ThemeContext } from '../Auth/ThemeContext';

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {

const { isDarkTheme } =ThemeContext();
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, color: isDarkTheme? "white": "black" },
        tabBarIndicatorStyle: { backgroundColor: 'tomato' },
        tabBarStyle: { backgroundColor: isDarkTheme? "black": 'white' },
      }}
    >
      <TopTab.Screen name="MoviesList" component={MovieScreen} />
      <TopTab.Screen name="People" component={PeopleScreen} />
    </TopTab.Navigator>
  );
};

export default TopTabNavigator;
