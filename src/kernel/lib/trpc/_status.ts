export const HTTP_STATUS = {
  // BAD_REQUEST: "BAD_REQUEST",
  // UNAUTHORIZED: "UNAUTHORIZED",
  // FORBIDDEN: "FORBIDDEN",
  // NOT_FOUND: "NOT_FOUND",
  // METHOD_NOT_SUPPORTED: "METHOD_NOT_SUPPORTED",
  // TIMEOUT: "TIMEOUT",
  // CONFLICT: "CONFLICT",
  // PRECONDITION_FAILED: "PRECONDITION_FAILED",
  // PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
  // UNSUPPORTED_MEDIA_TYPE: "UNSUPPORTED_MEDIA_TYPE",
  // UNPROCESSABLE_CONTENT: "UNPROCESSABLE_CONTENT",
  // TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
  // CLIENT_CLOSED_REQUEST: "CLIENT_CLOSED_REQUEST",
  // INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  // NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
  // BAD_GATEWAY: "BAD_GATEWAY",
  // SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  // GATEWAY_TIMEOUT: "GATEWAY_TIMEOUT",
  PARSE_ERROR: "PARSE_ERROR",
  BAD_REQUEST: "BAD_REQUEST",

  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED",

  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  METHOD_NOT_SUPPORTED: "METHOD_NOT_SUPPORTED",
  TIMEOUT: "TIMEOUT",
  CONFLICT: "CONFLICT",
  PRECONDITION_FAILED: "PRECONDITION_FAILED",
  UNSUPPORTED_MEDIA_TYPE: "UNSUPPORTED_MEDIA_TYPE",
  PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
  UNPROCESSABLE_CONTENT: "UNPROCESSABLE_CONTENT",
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
  CLIENT_CLOSED_REQUEST: "CLIENT_CLOSED_REQUEST",
} as const;

export type ErrorCodeKeyType = keyof typeof HTTP_STATUS;

export const HTTP_STATUS_CODE: { [key in ErrorCodeKeyType]: number } = {
  [HTTP_STATUS.PARSE_ERROR]: 400,
  [HTTP_STATUS.BAD_REQUEST]: 400,
  [HTTP_STATUS.UNAUTHORIZED]: 401,
  [HTTP_STATUS.FORBIDDEN]: 403,
  [HTTP_STATUS.NOT_FOUND]: 404,
  [HTTP_STATUS.METHOD_NOT_SUPPORTED]: 405,
  [HTTP_STATUS.TIMEOUT]: 408,
  [HTTP_STATUS.CONFLICT]: 409,
  [HTTP_STATUS.PRECONDITION_FAILED]: 412,
  [HTTP_STATUS.PAYLOAD_TOO_LARGE]: 413,
  [HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE]: 415,
  [HTTP_STATUS.UNPROCESSABLE_CONTENT]: 422,
  [HTTP_STATUS.TOO_MANY_REQUESTS]: 429,
  [HTTP_STATUS.CLIENT_CLOSED_REQUEST]: 499,
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 500,
  [HTTP_STATUS.NOT_IMPLEMENTED]: 501,
};
// export const HttpStatusCode: { [key in HttpStatusEnum]: number } = {
//   [HttpStatusEnum.BAD_REQUEST]: 400,
//   [HttpStatusEnum.UNAUTHORIZED]: 401,
//   [HttpStatusEnum.FORBIDDEN]: 403,
//   [HttpStatusEnum.NOT_FOUND]: 404,
//   [HttpStatusEnum.METHOD_NOT_SUPPORTED]: 405,
//   [HttpStatusEnum.TIMEOUT]: 408,
//   [HttpStatusEnum.CONFLICT]: 409,
//   [HttpStatusEnum.PRECONDITION_FAILED]: 412,
//   [HttpStatusEnum.PAYLOAD_TOO_LARGE]: 413,
//   [HttpStatusEnum.UNSUPPORTED_MEDIA_TYPE]: 415,
//   [HttpStatusEnum.UNPROCESSABLE_CONTENT]: 422,
//   [HttpStatusEnum.TOO_MANY_REQUESTS]: 429,
//   [HttpStatusEnum.CLIENT_CLOSED_REQUEST]: 499,
//   [HttpStatusEnum.INTERNAL_SERVER_ERROR]: 500,
//   [HttpStatusEnum.NOT_IMPLEMENTED]: 501,
//   [HttpStatusEnum.BAD_GATEWAY]: 502,
//   [HttpStatusEnum.SERVICE_UNAVAILABLE]: 503,
//   [HttpStatusEnum.GATEWAY_TIMEOUT]: 504,
// };
//
// export const HttpStatusDescription: { [key in HttpStatusEnum]: string } = {
//   [HttpStatusEnum.BAD_REQUEST]:
//     "The server cannot or will not process the request due to something that is perceived to be a client error.",
//   [HttpStatusEnum.UNAUTHORIZED]:
//     "The client request has not been completed because it lacks valid authentication credentials for the requested resource.",
//   [HttpStatusEnum.FORBIDDEN]:
//     "The server was unauthorized to access a required data source, such as a REST API.",
//   [HttpStatusEnum.NOT_FOUND]: "The server cannot find the requested resource.",
//   [HttpStatusEnum.METHOD_NOT_SUPPORTED]:
//     "The server knows the request method, but the target resource doesn't support this method.",
//   [HttpStatusEnum.TIMEOUT]:
//     "The server would like to shut down this unused connection.",
//   [HttpStatusEnum.CONFLICT]:
//     "The server request resource conflict with the current state of the target resource.",
//   [HttpStatusEnum.PRECONDITION_FAILED]:
//     "Access to the target resource has been denied.",
//   [HttpStatusEnum.PAYLOAD_TOO_LARGE]:
//     "Request entity is larger than limits defined by server.",
//   [HttpStatusEnum.UNSUPPORTED_MEDIA_TYPE]:
//     "The server refuses to accept the request because the payload format is in an unsupported format.",
//   [HttpStatusEnum.UNPROCESSABLE_CONTENT]:
//     "The server understands the request method, and the request entity is correct, but the server was unable to process it.",
//   [HttpStatusEnum.TOO_MANY_REQUESTS]:
//     "The rate limit has been exceeded or too many requests are being sent to the server.",
//   [HttpStatusEnum.CLIENT_CLOSED_REQUEST]:
//     "Access to the resource has been denied.",
//   [HttpStatusEnum.INTERNAL_SERVER_ERROR]: "An unspecified error occurred.",
//   [HttpStatusEnum.NOT_IMPLEMENTED]:
//     "The server does not support the functionality required to fulfill the request.",
//   [HttpStatusEnum.BAD_GATEWAY]:
//     "The server received an invalid response from the upstream server.",
//   [HttpStatusEnum.SERVICE_UNAVAILABLE]:
//     "The server is not ready to handle the request.",
//   [HttpStatusEnum.GATEWAY_TIMEOUT]:
//     "The server did not get a response in time from the upstream server that it needed in order to complete the request.",
// };
