const errorMiddleware = (error, req, res, next) => {
   res.status(error.status || 500)
   res.json({
      status: error.status,
      message: error.message,
      stack: error.stack,
   })
}
module.exports = errorMiddleware
