import { View, Image, Text, StyleSheet } from 'react-native';
import { Result } from '../Types/People';
import { useThemeContext } from '../Auth/ThemeContext';
import { AppColorsType } from '../Utilities/Colors';

const RenderItem = ({ item }: { item: Result }) => {
  const { requiredColors } = useThemeContext();

  return (
    <View style={styles(requiredColors).card}>
      <Image
        source={{
          uri: item.profile_path
            ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
            : 'https://via.placeholder.com/200x300.png?text=No+Image',
        }}
        style={styles(requiredColors).profileImage}
      />
      <View style={styles(requiredColors).info}>
        <Text style={styles(requiredColors).name}>{item.name}</Text>
        <Text style={styles(requiredColors).department}>Popularity: {item.popularity}</Text>
        <Text style={styles(requiredColors).department}>{item.gender === 1 ? 'Female' : 'Male'}</Text>
        <Text style={styles(requiredColors).department}>{item.known_for_department}</Text>
        {item.known_for && item.known_for.length > 0 ? (
          item.known_for.slice(0, 1).map((movie, index) => {
            const title = movie.title;
            return (
              <Text key={index} style={styles(requiredColors).movieTitle}>
                {title ? `🎬 Acted in: ${title}` : '🎬 No movie/TV title found'}
              </Text>
            );
          })
        ) : (
          <Text style={styles(requiredColors).movieTitle}>🎬 No content found</Text>
        )}
      </View>
    </View>
  );
};


const styles = (requiredColors:AppColorsType) => StyleSheet.create({
card: {
    flexDirection: 'row',
    backgroundColor: requiredColors.MovieCardBackground,
    borderWidth: 1,
    borderColor: requiredColors.lightGray,
    borderRadius: 12,
    marginVertical: 8,
    padding: 15,
  },
  profileImage: {
    width: '30%',
    height: '100%',
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color : requiredColors.darkText,
  },
  department: {
    fontSize: 14,
    color: requiredColors.darkText,
    marginVertical: 4,
  },
  movieTitle: {
    fontSize: 13,
    color: requiredColors.darkText,
  },
});

export default RenderItem;
