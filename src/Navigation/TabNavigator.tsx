import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../Screens/HomeScreen";
import AddTaskScreen from "../Screens/AddTaskScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import { TabParamList } from "../Types/Navigation";
import getTabBarIcon from "../Utilities/GetTabBarIcon";
import MenuButton from "../Components/MenuButton";
import TopTabNavigator from "./TopTabBar";

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerLeft: () => <MenuButton />,
        tabBarIcon: getTabBarIcon(route.name),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AddTask" component={AddTaskScreen} />
      <Tab.Screen name="Movie" component={TopTabNavigator} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
