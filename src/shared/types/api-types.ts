export type UniversalListResponse<T> = {
  records: T[];
  totalRecords: number;
};

export type BackendError = {
  error: string;
  status: number;
};
