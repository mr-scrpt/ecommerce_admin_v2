export type OperationsMap<T> = {
  [key: string]: (value: string) => Promise<T>;
};
