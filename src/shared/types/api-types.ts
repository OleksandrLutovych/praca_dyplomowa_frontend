export type UniversalListResponse<T> = {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    nextPageUrl: string | null;
    prevPageUrl: string | null;
    total: number;
    totalPerPage: number;
  };
};

export type BackendError = {
  error: string;
  status: number;
};
