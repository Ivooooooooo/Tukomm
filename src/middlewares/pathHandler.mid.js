const pathHandler = (req, res) => {
  const message = `The route ${req.method} ${req.url} does not exist.`;
  console.warn(message);

  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message,
    suggestion: 'Please check the URL or return to the homepage.',
  });
};

export default pathHandler;