import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { errors } from 'celebrate';

import notesRouter from './routes/notesRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();
app.use(logger);

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(cors());
app.use(express.json());

app.use(notesRouter);

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

const startServer = async () => {
  await connectMongoDB();

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
