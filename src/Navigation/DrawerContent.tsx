import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/UserSlice';
import { useThemeContext } from '../Auth/ThemeContext';
import { AppColorsType } from '../Utilities/Colors';
import { StyleSheet } from 'react-native';

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const dispatch = useDispatch();
  const { requiredColors } = useThemeContext();

  const handleLogout = () => {
    dispatch(logoutUser());
    console.log('logout clicked');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        labelStyle={styles(requiredColors).DrawerStyles}
      />
    </DrawerContentScrollView>
  );
};

const styles = (requiredColors: AppColorsType) => StyleSheet.create({
  DrawerStyles: {
    color: requiredColors.dangerButton,
    backgroundColor: requiredColors.logoutBackground,
    height: 40,
    borderRadius: 20,
    padding: 10,
  },
});

export default DrawerContent;
