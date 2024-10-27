const errorHandler = (error, req, res, next) => {
    const { statusCode, message } = error;
    console.error(error);
    return res.status(statusCode || 500).json({
        message: message || `${req.method} ${req.url} ${error.message}`,
    });
};

export default errorHandler;