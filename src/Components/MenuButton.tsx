import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Types/Navigation.Types'; 

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>;

const MenuButton = () => {
  const navigation = useNavigation<DrawerNav>();

  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default MenuButton;
