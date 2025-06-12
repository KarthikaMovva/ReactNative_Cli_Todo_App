import React from 'react';
import MenuButton from '../Components/MenuButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/HomeScreen';
import AddTaskScreen from '../Screens/AddTaskScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import getTabBarIcon from '../Utilities/GetTabBarIcon';
import MovieScreen from '../Screens/MovieScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      headerLeft: () => <MenuButton />,
      tabBarIcon: getTabBarIcon(route.name),
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Add Task" component={AddTaskScreen} />
    <Tab.Screen name='Movies' component={MovieScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
