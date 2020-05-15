const createError = require('http-errors')
const ErrorHandler = function (error, doc, next) {
   if (error) {
      next(createError(500, error.errmsg))
   } else {
      next()
   }
}

module.exports = ErrorHandler
