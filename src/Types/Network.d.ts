export interface FetchConfig<T> {
  endpoint: string;
  page: number;
  sortKey: keyof T;
  sortOrder?: 'asc' | 'desc';
  onSuccess: (items: T[]) => void;
  onError?: (error: any) => void;
  onComplete?: () => void;
  getTotalPages?: (data: any) => number;
}
