import { View } from 'react-native';
import Title from '../Components/Title';
import { StyleSheet } from 'react-native';
import { AppColorsType } from '../Utilities/Colors';
import { ThemeContext } from '../Auth/ThemeContext';

const PeopleScreen = () => {
  const { requiredColors } = ThemeContext();
  return (
    <View style={styles(requiredColors).Background}>
        <Title heading="PeopleScreen"/>
    </View>
  );
};
const styles = (requiredColors:AppColorsType) => StyleSheet.create({
  Background:{
    backgroundColor: requiredColors.background,
    flex :1,
  },
});
export default PeopleScreen;
