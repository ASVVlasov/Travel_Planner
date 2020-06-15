const errorMiddleware = (error, req, res, next) => {
   res.status(error.status || 500)
   if (error.status) {
      res.json({
         status: error.status,
         message: error.message,
      })
   } else {
      res.send()
   }
}
module.exports = errorMiddleware
