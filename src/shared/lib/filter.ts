export const filterNullValues = <T>(arr: (T | null)[]): T[] =>
  arr.filter((item): item is T => item !== null);
