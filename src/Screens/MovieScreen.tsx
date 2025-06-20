import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import axiosInstance from '../Network/AxiosInstance';
import { Movie } from '../Types/Movie';
import SearchBar from '../Components/SearchBar';
import { AppColorsType } from '../Utilities/Colors';
import { useDebounce } from '../CustomHook/useDebounce';
import { useThemeContext } from '../Auth/ThemeContext';
import { Endpoints } from '../Network/Endpoints';
import EmptyComponent from '../Components/EmptyComponent';
import LoadingIndicator from '../Components/LoadingIndicator';

const MoviesScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const debouncedSearch = useDebounce<string>(search, 300);
  const { requiredColors } = useThemeContext();

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
        console.log(response, 'from movies Screen');
        setHasMore(pageNum < totalPages);
        setLength(movies.length);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, []);

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
        setLength(movies.length);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    },
    []
  );

 useEffect(() => {
    fetchTopRatedMovies(1);
  }, [fetchTopRatedMovies]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      fetchSearchedMovies(debouncedSearch);
    }
  }, [debouncedSearch,fetchSearchedMovies]);

  const onRefresh = useCallback(() => {
    if (debouncedSearch.trim() === '') {
      setRefreshing(true);
      setMovies([]);
      fetchTopRatedMovies(1);
    }
  }, [fetchTopRatedMovies,debouncedSearch]);


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
    setSearch(text);
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles(requiredColors).card}>
      <Image
        source={{
          uri: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : 'https://placehold.co/500x750/cccccc/333333?text=No+Image',
        }}
        style={styles(requiredColors).poster}
      />
      <View style={styles(requiredColors).details}>
        <Text style={styles(requiredColors).title}>{item.title}</Text>
        <Text style={styles(requiredColors).rating}>Rating: {item.vote_average.toFixed(1)} / 10</Text>
        <Text style={styles(requiredColors).release}>Release: {item.release_date}</Text>
        <Text style={styles(requiredColors).overview} numberOfLines={3}>
          {item.overview || 'No overview available.'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles(requiredColors).container}>
      <SearchBar value={search} onChangeText={handleChange} placeholder="Search movies..." />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles(requiredColors).content}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        ListFooterComponent={loading || movies.length < length ? <LoadingIndicator text="Loading more movies..."/> : null}
        ListEmptyComponent={<EmptyComponent text="No movies found"/>}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = (requiredColors: AppColorsType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: requiredColors.background,
    padding: 5,
  },
  content: {
    padding: 5,
    paddingVertical: 3,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: requiredColors.MovieCardBackground,
    borderWidth: 1,
    borderColor: requiredColors.lightGray,
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
    color: requiredColors.MovieTitle,
  },
  rating: {
    color: requiredColors.MovieOverview,
    marginVertical: 2,
  },
  release: {
    color: requiredColors.MovieRelease,
    marginBottom: 5,
  },
  overview: {
    fontSize: 13,
    color: requiredColors.MovieOverview,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 10,
    color: requiredColors.MovieOverview,
  },
});

export default MoviesScreen;
