import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleSwitch from '../Components/ToggelSwitch';
 import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  const[isEnabled, setisEnabled] = useState<boolean>(false);

  return (
    <View>
      <View style={styles.profileContainer}>
      <Ionicons name="person-circle" size={130} color="#4F8EF7"/>
      </View>
    <View>
      <ToggleSwitch
        label='Turn on dark theme'
        value={isEnabled}
        onValueChange={(val) => setisEnabled(val)}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer:{
    alignItems : 'center',
    paddingVertical : 20,
  }
});

export default SettingsScreen;
