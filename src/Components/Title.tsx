import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TitleProps } from '../Types/Props';
import Colors from '../Utilities/Colors';
import { ThemeContext } from '../Auth/ThemeContext';

const Title: React.FC<TitleProps> = ({ heading, style, onPress }) => {
  const { isDarkTheme } = ThemeContext();

  return (
    <View>
      <Text style={[styles(isDarkTheme).title, style]} onPress={onPress}>{heading}</Text>
    </View>
  );
};

const styles = (isDarkTheme:boolean) => StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    paddingVertical: 20,
    textAlign: 'center',
    color: isDarkTheme? Colors.background: Colors.darkText,
  },
});

export default Title;
