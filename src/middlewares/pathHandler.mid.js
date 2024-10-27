const pathHandler = (req, res, next) => {
    const message = `${req.method} ${req.url} path not found`;
    console.error(message);
    return res.status(404).json({ message });
};

export default pathHandler;