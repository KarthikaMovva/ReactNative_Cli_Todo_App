import { View } from "react-native";
import Title from "../Components/Title";
import { StyleSheet } from "react-native";
import Colors from "../Utilities/Colors";
import { ThemeContext } from "../Auth/ThemeContext";

const PeopleScreen = () => {
  const { isDarkTheme } = ThemeContext();
  return (
    <View style={styles(isDarkTheme).Background}>
        <Title heading='PeopleScreen'/>
    </View>
  )
}
const styles = (isDarkTheme:boolean) => StyleSheet.create({
  Background:{
    backgroundColor: isDarkTheme? Colors.darkTheme.darkBackground : Colors.background,
    flex :1
  }
})
export default PeopleScreen