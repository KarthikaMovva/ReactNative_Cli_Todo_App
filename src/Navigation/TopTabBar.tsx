import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MovieScreen from '../Screens/MovieScreen';
import PeopleScreen from '../Screens/PeopleScreen';

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarIndicatorStyle: { backgroundColor: 'tomato' },
        tabBarStyle: { backgroundColor: 'white' },
      }}
    >
      <TopTab.Screen name="MoviesList" component={MovieScreen} />
      <TopTab.Screen name="People" component={PeopleScreen} />
    </TopTab.Navigator>
  );
};

export default TopTabNavigator;
