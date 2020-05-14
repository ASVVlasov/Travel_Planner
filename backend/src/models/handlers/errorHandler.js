const createError = require('http-errors')
class ErrorHandler {
   static onSave(error, doc, next) {
      if (error) {
         next(createError(500, error.errmsg))
      } else {
         next()
      }
   }
}

module.exports = ErrorHandler
