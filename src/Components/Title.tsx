import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TitleProps } from '../Types/Props';
import Colors from '../Utilities/Colors';

const Title: React.FC<TitleProps> = ({ heading, style, onPress }) => {
  return (
    <View>
      <Text style={[styles.title, style]} onPress={onPress}>{heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    paddingVertical: 20,
    textAlign: 'center',
    color: Colors.darkText,
  },
});

export default Title;
