import { Movie } from './MovieList';

export interface MovieApiResponse {
    results: Movie[];
    total_pages: number;
}
