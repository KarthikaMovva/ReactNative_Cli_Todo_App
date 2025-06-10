import { Movie } from "./MovieList.Types";

export interface MovieApiResponse {
    results: Movie[];
    total_pages: number;
}