const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log the error to the dev
  // console.log(chalk.red(err));

  // 1) CAST ERROR
  if (error.name === 'CastError') {
    const message = `No Resource found`;
    error = new ErrorResponse(message, 404);
  }

  // 2) VALIDATION ERROR
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).join(', ');
    error = new ErrorResponse(message, 400);
  }

  // 3) DUPLICATE FIELDS
  if (error.code === 11000) {
    const message = `the field provided: ${error.keyValue.name} must be unique`;
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: 'fail',
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
