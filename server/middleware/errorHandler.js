import StatusCodes from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  const thrownError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Internal server error. Please wait and try again.",
  };

  // Check for mongoose ValidationErrors
  if (err.name === "ValidationError") {
    // Get field and message for each validation error
    const fields = Object.values(err.errors).map((field) => field.path);
    const message = Object.values(err.errors)
      .map((field) => field.message)
      .join(". ");
    res.status(StatusCodes.BAD_REQUEST).json({ fields, message });
  }
  // Check for invalid argument to mongoose function, such as invalid ID
  else if (err.name === "CastError") {
    const field = err.path;
    const messages = `${field} is invalid for the given request`;
    res.status(StatusCodes.BAD_REQUEST).json({ fields, message });
  }
  // Check for mongoose duplicate of unique key error
  else if (err.code && err.code === 11000) {
    const fields = Object.keys(err.keyValue);
    const message = `An account with the specified ${fields} already exists`;
    res.status(StatusCodes.CONFLICT).json({ fields, message });
    // Return general error
  } else {
    res.status(thrownError.statusCode).json({ message: thrownError.message });
  }
};

export default errorHandler;
