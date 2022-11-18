import APIError from './APIError.js';
import StatusCodes from 'http-status-codes';

class AuthorizationError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default AuthorizationError;
