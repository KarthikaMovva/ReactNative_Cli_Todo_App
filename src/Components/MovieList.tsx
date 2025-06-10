import React from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ListRenderItem,
} from 'react-native';
import { MovieListProps, Movie } from '../Types/MovieList.Types';
import Colors from '../Utilities/Colors';

const MovieList: React.FC<MovieListProps> = ({
  movies,
  onEndReached,
  refreshing,
  onRefresh,
  loading,
}) => {
  const renderItem: ListRenderItem<Movie> = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : `https://placehold.co/500x750/cccccc/333333?text=No+Image`,
        }}
        style={styles.poster}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>Rating: {item.vote_average.toFixed(1)} / 10</Text>
        <Text style={styles.release}>Release: {item.release_date}</Text>
        <Text style={styles.overview} numberOfLines={3}>
          {item.overview || 'No overview available.'}
        </Text>
      </View>
    </View>
  );

  const renderFooter = () =>
    loading && movies.length > 0 ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.footerText}>Loading more movies...</Text>
      </View>
    ) : null;

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007bff" />
      }
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 10,
    paddingVertical: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.MovieCardBackgroundcolor,
    borderRadius: 12,
    marginVertical: 8,
    padding: 15
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginHorizontal: 15,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.MovieTitle,
  },
  rating: {
    color: Colors.MovieRating,
    marginVertical: 2,
  },
  release: {
    color: Colors.MovieRelease,
    marginBottom: 5,
  },
  overview: {
    fontSize: 13,
    color: Colors.MovieOverview,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 10,
    color: Colors.MovieFooter,
  },
});

export default MovieList;
