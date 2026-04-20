import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();

const startServer = async () => {
  try {
    await connectMongoDB();

    app.use(logger);
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());

    app.use('/auth', authRouter);
    app.use('/users', userRoutes);
    app.use(notesRouter);

    app.use(errors());
    app.use(notFoundHandler);
    app.use(errorHandler);

    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Помилка при запуску сервера:', error.message);
  }
};

startServer();
