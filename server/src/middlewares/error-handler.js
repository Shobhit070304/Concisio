const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    data: null
  });
};

module.exports = errorHandler;
