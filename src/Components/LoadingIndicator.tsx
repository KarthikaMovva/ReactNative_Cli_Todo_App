import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../Auth/ThemeContext';
import { AppColorsType } from '../Utilities/Colors';
import { ActivityIndicatorProps } from '../Types/Props';

const LoadingIndicator:React.FC<ActivityIndicatorProps> = ({ text }) => {
    const { requiredColors } = useThemeContext();

    return (

        <View style={styles(requiredColors).footer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles(requiredColors).footerText}>{text}</Text>
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
export default LoadingIndicator;
