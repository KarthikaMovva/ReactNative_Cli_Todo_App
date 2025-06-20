import { View, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../Auth/ThemeContext';
import { EmptyComponentProps } from '../Types/Props';
import { AppColorsType } from '../Utilities/Colors';

const EmptyComponent:React.FC<EmptyComponentProps> = ({ text }) => {

    const { requiredColors } = useThemeContext();

    return (
      <View style={styles(requiredColors).footer}>
        <Text style={styles(requiredColors).footerText}>{ text }</Text>
      </View>
    );
  };

const styles = (requiredColors: AppColorsType) => StyleSheet.create({
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    footerText: {
        marginTop: 10,
        color: requiredColors.MovieOverview,
    },
});
export default EmptyComponent;
