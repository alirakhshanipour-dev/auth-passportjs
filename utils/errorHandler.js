const errorHandler = (error, req, res, next) => {
    if (error) {
        return res.status(error.status || 500).json({
            statusCode: error.status || 500,
            message: error.message || "Internal Server Error"
        });
    }

    next();
};

export { errorHandler }