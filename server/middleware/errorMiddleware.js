// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(`🔴 Error: ${err.message}`);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: messages,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  // Generic server error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server error',
  });
};

export default errorHandler;
