import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/UserSlice';

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const dispatch = useDispatch();

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
        labelStyle={{ color: 'red' }}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
