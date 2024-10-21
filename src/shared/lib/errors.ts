export class AuthorizatoinError extends Error {
  constructor(message = "AuthorizatoinError") {
    super(message);
  }
}

export class ForbiddenError extends Error {
  constructor(message = "AuthorizatoinError") {
    super(message);
  }
}

// TODO: Move to all error
export class NeedAuthError extends Error {
  constructor(message = "NeedAuthError") {
    super(message);
  }
}

export class BadRequest extends Error {
  constructor(message = "BadRequest") {
    super(message);
  }
}
