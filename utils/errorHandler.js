const logger = require('./logger');

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[${req.method} ${req.path}] Status: ${status}, Message: ${message}`, {
    stack: err.stack,
    url: req.url,
  });

  return res.status(status).send({
    success: false,
    message: message,
    status: status,
  });
};

module.exports = errorHandler;
