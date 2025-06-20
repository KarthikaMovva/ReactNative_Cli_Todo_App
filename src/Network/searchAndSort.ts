import axiosInstance from '../Network/AxiosInstance';

interface SearchAndSortConfig<T> {
  endpoint: string;
  query: string;
  sortKey: keyof T;
  sortOrder?: 'asc' | 'desc';
  onSuccess: (items: T[]) => void;
  onError?: (error: any) => void;
}

export const searchAndSort = async <T>({
  endpoint,
  query,
  sortKey,
  sortOrder = 'desc',
  onSuccess,
  onError,
}: SearchAndSortConfig<T>) => {
  try {
    const response = await axiosInstance.get(endpoint, {
      params: { query },
    });

    const results: T[] = response.data.results;

    const sorted = [...results].sort((a, b) => {
      const aVal = a[sortKey] as number;
      const bVal = b[sortKey] as number;
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

    onSuccess(sorted);
  } catch (error) {
     if (onError) onError(error);
    else console.error('Search error:', error);
  }
};
