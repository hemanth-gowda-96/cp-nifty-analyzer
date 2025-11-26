export type ServiceResponseType<T> = {
  data: T | null;
  error: string | null;
};

export type APIResponseType<T> = {
  code: string;
  message: string;
  data: T | null;
};
