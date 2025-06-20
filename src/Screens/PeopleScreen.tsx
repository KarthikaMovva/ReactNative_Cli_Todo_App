import { StyleSheet, View, FlatList } from 'react-native';
import { AppColorsType } from '../Utilities/Colors';
import { useCallback, useState, useEffect } from 'react';
import { searchAndSort } from '../Network/searchAndSort';
import { Endpoints } from '../Network/Endpoints';
import RenderItem from '../Components/RenderItem';
import SearchBar from '../Components/SearchBar';
import { useDebounce } from '../CustomHook/useDebounce';
import { useThemeContext } from '../Auth/ThemeContext';
import { Result } from '../Types/People';
import LoadingIndicator from '../Components/LoadingIndicator';
import { fetchAndSort } from '../Network/FetchAndSort';
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

  const fetchPeople = useCallback(async (pageNum: number) => {
    await fetchAndSort<Result>({
      endpoint: Endpoints.people,
      page: pageNum,
      sortKey: 'popularity',
      sortOrder: 'desc',
      onSuccess: (sortedPeople) => {
        setPeople((prev) => {
          const combined = [...prev, ...sortedPeople];
          const unique = Array.from(new Map(combined.map(m => [m.id, m])).values());
          return unique;
        });
      },
      onError: (err) => console.error('Failed to fetch:', err),
      onComplete: () => {
        setLoading(false);
        setRefreshing(false);
      },
      getTotalPages: (data) => {
        setHasMore(pageNum < data.total_pages);
        return data.total_pages;
      },
    });
  }, []);


  const fetchSearchedPeople = useCallback((query: string) => {
    searchAndSort<Result>({
      endpoint: Endpoints.searchPeople,
      query,
      sortKey: 'popularity',
      onSuccess: (sortedResults) => {
        setPeople(sortedResults);
        setHasMore(false);
      },
    });
  }, []);


  useEffect(() => {
    if (debouncedSearch.trim()) {
      setPage(1);
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
      setPage(1);
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
