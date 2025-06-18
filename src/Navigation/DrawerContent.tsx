import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/UserSlice';
import { ThemeContext } from '../Auth/ThemeContext';
import Colors from '../Utilities/Colors';
import { StyleSheet } from 'react-native';

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const dispatch = useDispatch();
  const { isDarkTheme, setisDarkTheme } = ThemeContext();

  const handleLogout = () => {
    dispatch(logoutUser());
    setisDarkTheme(false);
    console.log('logout clicked');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        labelStyle={styles(isDarkTheme).drawerstyles}
      />
    </DrawerContentScrollView>
  );
};

const styles = (isDarkTheme: boolean) => StyleSheet.create({
  drawerstyles: {
    color: isDarkTheme ? "white" : "red",
    backgroundColor: isDarkTheme ? Colors.darkTheme.logout : Colors.background,
    height: 40,
    borderRadius: 20,
    padding: 10
  }
})

export default DrawerContent;
