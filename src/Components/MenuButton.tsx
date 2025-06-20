import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../Types/Navigation';
import { useThemeContext } from '../Auth/ThemeContext';

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>;

const MenuButton = () => {
  const navigation = useNavigation<DrawerNav>();
  const { requiredColors } = useThemeContext();

  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={24} color={requiredColors.darkText} style={styles.container}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default MenuButton;
