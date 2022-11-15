import express from "express";
import * as dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import ticketRouter from "./routes/ticketRouter.js";
import errorHandler from "./middleware/errorHandler.js";
import dbConnector from "./dbConnector.js";
import checkToken from "./middleware/authHandler.js";
import cors from "cors";

// Configuration
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tickets", checkToken, ticketRouter);

//Error handler middleware
app.use(errorHandler);

// Start server and listen for requests
const startUp = async () => {
  let dbUri;
  if (process.env.NODE_ENV === "test") {
    dbUri = process.env.ATLAS_URI_TEST;
  } else {
    dbUri = process.env.ATLAS_URI;
  }
  try {
    await dbConnector(dbUri);
    app.listen(process.env.PORT);
    console.info(`Server is listening on port ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
  }
};

startUp();

export { app };
