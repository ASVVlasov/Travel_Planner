const createError = require('http-errors')
const Errors = require('../types/errors')

const ErrorHandler = function (error, doc, next) {
   if (error) {
      next(createError(error.status, error.message))
   } else {
      next()
   }
}
const ErrorTravelHandler = function (error, doc, next) {
   if (error) {
      if (error.name === 'CastError') {
         switch (error.path) {
            case '_id': {
               next(createError(404, Errors.travelError.notFound))
               break
            }
            case 'beginDate':
            case 'endDate': {
               next(createError(400, Errors.travelError.dateError + ` {${error.path}}`))
               break
            }
         }
      }
      ErrorHandler(error, doc, next)
   } else {
      next()
   }
}

module.exports = { ErrorHandler, ErrorTravelHandler }
