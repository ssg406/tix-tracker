import mongoose from "mongoose";

const dbConnector = (url) => {
  return mongoose.connect(url);
};

export default dbConnector;
