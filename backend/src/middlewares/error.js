const Errors = require('../models/types/errors')

const errorMiddleware = (error, req, res, next) => {
   res.status(error.status || 500)
   if (error.status) {
      res.json({
         type: error.type || 'error',
         status: error.status,
         message: error.message,
      })
   } else {
      res.json(Errors.commonError)
   }
}
module.exports = errorMiddleware
