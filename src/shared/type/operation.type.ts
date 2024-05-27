export type OperationsMap<T, K = string> = {
  [key: string]: (value: K) => Promise<T>;
};
