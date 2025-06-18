import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColorsType} from './Colors';

export const getTabBarIcon = (routeName: string) => {
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
      case 'AddTask':
        iconName = focused ? 'add-circle' : 'add-circle-outline';
        break;
      case 'Settings':
        iconName = focused ? 'settings' : 'settings-outline';
        break;
      case 'Movie':
        iconName = focused ? 'film' : 'film-outline';
        break;
      default:
        iconName = 'help-circle-outline';
    }

    return React.createElement(Ionicons, {name: iconName, size, color});
  };
};

export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `task-${timestamp}-${randomPart}`;
};

export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export const getStatusColor = (
  requiredColors: AppColorsType,
  status: string,
): string => {
  switch (status) {
    case TaskStatus.PENDING:
      return requiredColors.statusPending;
    case TaskStatus.IN_PROGRESS:
      return requiredColors.statusInProgress;
    case TaskStatus.DONE:
      return requiredColors.statusDone;
    default:
      return '#DDDDDD';
  }
};
