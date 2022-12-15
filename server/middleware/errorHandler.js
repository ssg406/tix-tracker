import StatusCodes from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
  // Build the error from given object or populate defaults
  const thrownError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal server error. Please wait and try again.',
  };
  // Check for mongoose ValidationErrors
  if (err.name === 'ValidationError') {
    // Get field and message for each validation error
    const fields = Object.values(err.errors).map((field) => field.path);
    const message = Object.values(err.errors)
      .map((field) => field.message)
      .join('. ');
    res.status(StatusCodes.BAD_REQUEST).json({ fields, message });
  }
  // Check for invalid argument to mongoose function, such as invalid ID
  else if (err.name === 'CastError') {
    const field = err.path;
    const messages = `${field} is invalid for the given request`;
    res.status(StatusCodes.BAD_REQUEST).json({ field, messages });
  }
  // Check for mongoose duplicate of unique key error
  else if (err.code && err.code === 11000) {
    const fields = Object.keys(err.keyValue);
    const message = `An account with the specified ${fields} already exists`;
    res.status(StatusCodes.CONFLICT).json({ fields, message });
  }
  // Error thrown by express-jwt for invalid/missing tokens
  else if (err.name === 'UnauthorizedError') {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
  // Return error that was thrown initially with given status and message
  else {
    res.status(thrownError.statusCode).json({ message: thrownError.message });
  }
};

export default errorHandler;
