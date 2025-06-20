import { StyleSheet, View, FlatList } from 'react-native';
import { AppColorsType } from '../Utilities/Colors';
import { useCallback, useState, useEffect } from 'react';
import axiosInstance from '../Network/AxiosInstance';
import { Endpoints } from '../Network/Endpoints';
import RenderItem from '../Components/RenderItem';
import SearchBar from '../Components/SearchBar';
import { useDebounce } from '../CustomHook/useDebounce';
import { useThemeContext } from '../Auth/ThemeContext';
import { Result } from '../Types/People';
import LoadingIndicator from '../Components/LoadingIndicator';
import EmptyComponent from '../Components/EmptyComponent';

const PeopleScreen = () => {
  const { requiredColors } = useThemeContext();
  const [people, setPeople] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const debouncedSearch = useDebounce<string>(search, 300);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);


  const fetchPeople = useCallback(async (pageNumber: number) => {
    try {
      const response = await axiosInstance.get(Endpoints.people, {
        params: { page: pageNumber },
      });
      const fetchedData: Result[] = response.data.results;
      const totalPages = response.data.total_pages;
      setPeople((prev) => {
        const existingIds = new Set(prev.map((eachPerson) => eachPerson.id));

        const newUniqueMovies = fetchedData.filter(
          (person) => !existingIds.has(person.id)
        );

        const combined = [...prev, ...newUniqueMovies];

        return combined.sort((a, b) => b.popularity - a.popularity);
      });

      setHasMore(pageNumber < totalPages);
      console.log(response, 'from PeopleScreen');
      setLength(people.length);
    } catch (error) {
      console.error('Error from PeopleScreen', error);
    }
    finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchSearchedPeople = useCallback(
    async (query: string) => {
      try {
        const response = await axiosInstance.get(Endpoints.searchPeople, {
          params: { query },
        });

        const results: Result[] = response.data.results;
        const sortedResults = results.sort((a, b) => b.popularity - a.popularity);
        setPeople(sortedResults);
        setHasMore(false);
        setLength(people.length);
      } catch (error) {
        console.error('Error searching people:', error);
      }
    },
    []
  );

  useEffect(() => {
    if (debouncedSearch.trim()) {
      fetchSearchedPeople(debouncedSearch);
    }
  }, [debouncedSearch, fetchSearchedPeople]);

  useEffect(() => {
    fetchPeople(1);
  }, [fetchPeople]);

  const handleEndReached = useCallback(() => {
    if (hasMore) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchPeople(nextPage);
        return nextPage;
      });
    }
  }, [hasMore, fetchPeople]);

  const onRefresh = useCallback(() => {
    if (debouncedSearch.trim() === '') {
      setRefreshing(true);
      setPeople([]);
      fetchPeople(1);
    }
  }, [fetchPeople, debouncedSearch]);

  const handleChange = (text: string) => {
    setSearch(text);
  };

  return (
    <View style={styles(requiredColors).Background}>
      <SearchBar value={search} onChangeText={handleChange} placeholder="Search profiles..." />
      <FlatList
        renderItem={({ item }) => <RenderItem item={item} />}
        data={people}
        onEndReached={handleEndReached}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={loading || people.length < length ? <LoadingIndicator text="Loading more profiles..." /> : null}
        ListEmptyComponent={<EmptyComponent text="No profiles found" />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = (requiredColors: AppColorsType) => StyleSheet.create({
  Background: {
    backgroundColor: requiredColors.background,
    flex: 1,
    padding: 10,
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
export default PeopleScreen;
