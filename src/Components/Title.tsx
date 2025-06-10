import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TitleProps } from '../Types/Props.Types';
import Colors from '../Utilities/Colors';

const Title: React.FC<TitleProps> = ({ heading, style }) => {
  return (
    <View>
      <Text style={[styles.title, style]}>{heading}</Text>
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
