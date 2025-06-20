import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TitleProps } from '../Types/Props';
import { AppColorsType } from '../Utilities/Colors';
import { useThemeContext } from '../Auth/ThemeContext';

const Title: React.FC<TitleProps> = ({ heading, style, onPress }) => {
  const { requiredColors } = useThemeContext();

  return (
    <View>
      <Text style={[styles(requiredColors).title, style]} onPress={onPress}>{heading}</Text>
    </View>
  );
};

const styles = (requiredColors:AppColorsType) => StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    paddingVertical: 20,
    textAlign: 'center',
    color: requiredColors.darkText,
  },
});

export default Title;
