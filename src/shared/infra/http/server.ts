/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { addTransactionalDataSource, initializeTransactionalContext } from 'typeorm-transactional';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
import { mqqtConect } from '../MQTT/config';

import '@shared/infra/database/typeorm';
import '@shared/container';
import upload from '@config/upload';
import { AppDataSource } from '../database/typeorm/data-source';

initializeTransactionalContext()
addTransactionalDataSource(AppDataSource);

console.log('ENV :', process.env.NODE_ENV)
const app = express();
app.use(express.json());
app.use(`${process.env.APP_API_PATH_STATIC_FILES}`, express.static(upload.tmpFolder))
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log(' ========================================================= ');
  console.log(' =============== Server started on port 3333 ============= ');
  console.log(' ========================================================= ');
});

mqqtConect()
