import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image
} from 'react-native';
import axiosInstance from '../Network/AxiosInstance';
import { Movie } from '../Types/MovieList';
import SearchBar from '../Components/SearchBar';
import Colors from '../Utilities/Colors';
import { useDebounce } from '../CustomHook/useDebounce';
import { Endpoints } from '../Network/Endpoints';

const MoviesScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setsearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);

   const fetchTopRatedMovies = useCallback(
    async (pageNum: number) => {
      try {
        const response = await axiosInstance.get(Endpoints.movies, {
          params: { page: pageNum },
        });

        const fetchedMovies: Movie[] = response.data.results;
        const totalPages = response.data.total_pages;

        setMovies((prevMovies) => {
        const combined = [...prevMovies, ...fetchedMovies];
        return combined.sort((a, b) => b.vote_average - a.vote_average);
      });
        setHasMore(pageNum < totalPages);
        console.log(hasMore,"hasmore inside function")
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },[hasMore]);

  const fetchSearchedMovies = useCallback(
  async (query: string) => {
    try {
      const response = await axiosInstance.get(Endpoints.search, {
        params: { query },
      });

      const results: Movie[] = response.data.results;
      const sortedResults = results.sort((a, b) => b.vote_average - a.vote_average);
      setMovies(sortedResults);
      setHasMore(false); 
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  },
  []
);


useEffect(() => {
  if (debouncedSearch.trim() === '') {
    setMovies([]);
    setPage(1);
    fetchTopRatedMovies(1);
  } else {
    fetchSearchedMovies(debouncedSearch);
  }
}, [debouncedSearch, fetchTopRatedMovies, fetchSearchedMovies]);

const handleEndReached = useCallback(() => {
  if (hasMore && debouncedSearch.trim() === '') {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchTopRatedMovies(nextPage);
      return nextPage;
    });
  }
}, [hasMore, debouncedSearch, fetchTopRatedMovies]);

const handleChange = (text: string) => {
  setsearch(text);
};

  const renderItem = ({ item }: { item: Movie }) => (
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

  const renderFooter = () => (
    movies.length > 0 ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.footerText}>Loading more movies...</Text>
      </View>
    ) : null
  );

  const renderEmptyComponent = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>No movies found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={handleChange} placeholder="Search movies..." />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MovieScreenBackground,
  },
  content: {
    padding: 10,
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.MovieCardBackgroundcolor,
    borderRadius: 12,
    marginVertical: 8,
    padding: 15,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
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

export default MoviesScreen;
