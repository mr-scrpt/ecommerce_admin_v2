export interface IFieldExtractor<T> {
  extract(error: unknown): T;
}
