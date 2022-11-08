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
    const messages = Object.values(err.errors).map((field) => field.message);
    res.status(StatusCodes.BAD_REQUEST).json({ fields, messages });
  }
  // Check for mongoose duplicate of unique key error
  else if (err.code && err.code === 11000) {
    const fields = Object.keys(err.keyValue);
    const messages = `An account with ${fields} already exists`;
    // Return general error
  } else {
    res.status(thrownError.statusCode).json({ message: thrownError.message });
  }
};

export default errorHandler;
