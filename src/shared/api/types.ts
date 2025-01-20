export type ListRequest = {
  signal: AbortSignal;
  pagination: {
    page: number;
    perPage: number;
  };
  filters?: any;
};
