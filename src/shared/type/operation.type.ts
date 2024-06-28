export type OperationsMap<T, K = string> = {
  [key: string]: (value: K) => Promise<T>;
};

export type ReplaceDateWithString<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};
