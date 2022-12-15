import express from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import xss from 'xss-clean';
import cors from 'cors';
import { expressjwt as jwt } from 'express-jwt';

// MongoDB connection
import dbConnector from './dbConnector.js';

// Routers
import authRouter from './routes/authRouter.js';
import ticketRouter from './routes/ticketRouter.js';

// Middleware
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

// Configuration
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Cookies
app.use(cookieParser());

// Router middleware
app.use('/api/v1/auth', authRouter);
app.use(
  '/api/v1/tickets',
  jwt({
    secret: process.env.JWT_SECRET,
    getToken: (req) => req.cookies.token,
    algorithms: ['HS256'],
  }),
  ticketRouter
);

// Not found middleware
app.use(notFound);

//Error handler middleware
app.use(errorHandler);

// Start server and listen for requests
const startUp = async () => {
  let dbUri;
  if (process.env.NODE_ENV === 'test') {
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
