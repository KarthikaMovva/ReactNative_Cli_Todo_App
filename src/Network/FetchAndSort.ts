import axiosInstance from '../Network/AxiosInstance';
import { FetchConfig } from '../Types/Network';

export async function fetchAndSort<T>({
  endpoint,
  page,
  sortKey,
  sortOrder = 'desc',
  onSuccess,
  onError,
  onComplete,
  getTotalPages,
}: FetchConfig<T>) {
  try {
    const response = await axiosInstance.get(endpoint, {
      params: { page },
    });

    const results: T[] = response.data.results;
    const sorted = [...results].sort((a, b) => {
      const aVal = a[sortKey] as number;
      const bVal = b[sortKey] as number;
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

    onSuccess(sorted);

    if (getTotalPages) {
      const totalPages = getTotalPages(response.data);
      return totalPages;
    }
  } catch (error) {
    onError?.(error);
  } finally {
    onComplete?.();
  }
}
