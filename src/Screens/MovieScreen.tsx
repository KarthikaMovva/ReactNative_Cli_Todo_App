import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar
} from 'react-native';
import WarningModal from '../Components/WarningModal';
import axiosMovieInstance from '../Network/AxiosMovieInstance';
import Title from '../Components/Title';
import MovieList from '../Components/MovieList';
import { MovieApiResponse } from '../Types/MovieScreen.Types';
import { Movie } from '../Types/MovieList.Types';
import Colors from '../Utilities/Colors';

const MovieScreen: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');

    const fetchMovies = useCallback(
        async (pageNumber: number = 1, isRefresh: boolean = false) => {
            if (loading) return;

            setLoading(true);

            try {
                const response = await axiosMovieInstance.get<MovieApiResponse>(
                    '/top_rated'
                );

                const { results, total_pages } = response.data;

                const sortedResults = results.sort(
                    (a, b) => b.vote_average - a.vote_average
                );

                setMovies(prev =>
                    isRefresh ? sortedResults : [...prev, ...sortedResults]
                );
                setPage(pageNumber);
                setTotalPages(total_pages);
            } catch (err) {
                console.error(err);
                const errorMessage = 'Failed to fetch movies. Please check your API key or network.';
                setModalMessage(errorMessage);
                setModalVisible(true);
            } 
        },
        [loading]
    );

    useEffect(() => {
        fetchMovies(1);
    }, [fetchMovies]);

    const handleLoadMore = () => {
        if (!loading && page < totalPages) {
            fetchMovies(page + 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setPage(1);
        fetchMovies(1, true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <WarningModal
                visible={modalVisible}
                message={modalMessage}
                onClose={() => setModalVisible(false)}
                onConfirm={() => {
                    setModalVisible(false);
                    fetchMovies(page);
                }}
            />

            <StatusBar barStyle="dark-content"/>
            <Title heading='Top Rated Movies' />

            <MovieList
                movies={movies}
                onEndReached={handleLoadMore}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                loading={loading}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.MovieScreenBackground,
    },
});

export default MovieScreen;
