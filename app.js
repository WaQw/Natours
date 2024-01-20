const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1. MIDDLEWARES

// use 3rd party middleware for logs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// use middleware for parsing data from the body
app.use(express.json());

// use middleware for serving static files
app.use(express.static(`${__dirname}/public`));

// define our own middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3. ROUTERS

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
