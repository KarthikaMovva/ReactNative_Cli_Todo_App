import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const getTabBarIcon = (routeName: string) => {
  return ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => {
    let iconName: string;

    switch (routeName) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Add Task':
        iconName = focused ? 'add-circle' : 'add-circle-outline';
        break;
      case 'Settings':
        iconName = focused ? 'settings' : 'settings-outline';
        break;
      case 'Movies':
        iconName = focused ? 'film' : 'film-outline'
        break;
      default:
        iconName = 'help-circle-outline';
    }

    return React.createElement(Ionicons, { name: iconName, size, color });
  };
};

export default getTabBarIcon;
