export type UniversalListResponse<T> = {
  records: T[];
  totalRecords: number;
};

export type BackendError = {
  message: string;
  status: number;
};
