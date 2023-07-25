export interface Page<T> {
  page: number;
  pageSize: number;
  total: number;
  count: number;
  items: T[];
}
