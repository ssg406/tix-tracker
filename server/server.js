import express from "express";
import * as dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import ticketRouter from "./routes/ticketRouter.js";
import errorHandler from "./middleware/errorHandler.js";
import dbConnector from "./dbConnector.js";

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router middleware
app.use(authRouter);
app.use("/api/v1", ticketRouter);

// TODO: Error middleware
app.use(errorHandler);
// Start server and listen for requests
const startUp = async () => {
  try {
    await dbConnector(process.env.ATLAS_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is up and listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startUp();
