import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SwitchTextProps } from '../Types/Props.Types';
import Colors from '../Utilities/Colors';

const SwitchText: React.FC<SwitchTextProps> = ({ text, onPress }) => {
  return (
    <Text style={styles.switchText} onPress={onPress}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  switchText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.signupSwitchText,
    textDecorationLine: 'underline',
    paddingVertical: 20,
  },
});

export default SwitchText;
