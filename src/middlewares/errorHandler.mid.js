const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "FATAL ERROR";
  console.error(error);
  res.status(statusCode).json({ message });
};

export default errorHandler;