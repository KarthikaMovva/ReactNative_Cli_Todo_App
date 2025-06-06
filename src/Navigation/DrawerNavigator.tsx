import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from '../Auth/AuthContext';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen name="Tabs" component={TabNavigator} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
