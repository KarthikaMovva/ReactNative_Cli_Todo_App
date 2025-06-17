import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, StyleSheet } from "react-native";
import HomeScreen from "../Screens/HomeScreen";
import AddTaskScreen from "../Screens/AddTaskScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import { TabParamList } from "../Types/Navigation";
import getTabBarIcon from "../Utilities/GetTabBarIcon";
import MenuButton from "../Components/MenuButton";
import TopTabNavigator from "./TopTabBar";
import Colors from "../Utilities/Colors";
import { ThemeContext } from "../Auth/ThemeContext";

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { isDarkTheme } = ThemeContext();
  const statusBarBarStyle = isDarkTheme ? 'light-content' : 'dark-content';
  const statusBarBackgroundColor = isDarkTheme ? Colors.darkTheme.tabsColor : Colors.background;

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
          tabBarStyle: styles(isDarkTheme).background,
          headerShown: true,
          headerStyle: styles(isDarkTheme).header,
          headerTitleStyle: styles(isDarkTheme).title
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

const styles = (isDarkTheme:boolean) => StyleSheet.create({
  background:{ 
    backgroundColor: isDarkTheme ? Colors.darkTheme.tabsColor : Colors.background, 
  },
  header:{
    backgroundColor: isDarkTheme ? Colors.darkTheme.tabsColor : Colors.background,
    color: isDarkTheme ? "white" : "black"
  },
  title:{
    color: isDarkTheme ? "white" : "black"
  }
})

export default TabNavigator;
