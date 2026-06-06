const AppError = require('../utils/AppError');

const notFound = (req, _res, next) => {
  next(new AppError(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  if (err.name === 'CastError') {
    response.message = 'Resource not found';
    return res.status(404).json(response);
  }

  if (err.code === 11000) {
    response.message = 'Duplicate field value entered';
    return res.status(400).json(response);
  }

  if (err.name === 'ValidationError') {
    response.message = Object.values(err.errors)
      .map((value) => value.message)
      .join(', ');
    return res.status(400).json(response);
  }

  return res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };