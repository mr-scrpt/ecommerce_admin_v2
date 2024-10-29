export interface IErrorAdapterResult {
  status: string;
  message: Array<string>;
  text: string;
  trace?: Array<{
    code: string;
    messageDetail: string;
    cause: unknown;
  }>;
}
