const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || res.statusCode || 500;
    let message = err.message || "Internal server error";

    if(err.name === "CastError"){
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];
        message = `An account with this ${field} already exists.`;
    }

    if (err.name === "ValidationError") {
        statusCode = 422;
        message = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
    }

    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token.";
    }
    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired. Please log in again.";
    }

    const response = {
        success: false,
        message,
    };
    
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }
    
    res.status(statusCode).json(response);

};

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
 
module.exports = { errorHandler, notFound };