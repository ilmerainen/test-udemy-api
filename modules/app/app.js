import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { router as indexRouter } from './app.router.js';
import { router as authRouter } from '../auth/auth.route.js';
import swaggerDocument from '../../swagger.js';
import { initSequelize } from '../../db/index.cjs';
import { courseRouter } from '../course/course.router.js';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health-check', indexRouter);
app.use('/', authRouter);
app.use('/courses', courseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    error: true,
  });
});

await initSequelize();

export { app };
