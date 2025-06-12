export interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string | null;
  release_date: string;
  [key: string]: any;
}

export interface MovieListProps {
  movies: Movie[];
  onEndReached: () => void;
  refreshing: boolean;
  onRefresh: () => void;
  loading: boolean;
}