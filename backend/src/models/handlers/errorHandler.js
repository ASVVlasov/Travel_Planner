const createError = require('http-errors')
const Errors = require('../types/errors')

const ErrorHandler = function (error, doc, next) {
   if (error) {
      next(createError(error.status, error.message, { type: error.type }))
   } else {
      next()
   }
}
const ErrorTravelHandler = function (error, doc, next) {
   if (error) {
      if (error.name === 'CastError') {
         switch (error.path) {
            case '_id': {
               next(Errors.travelError.notFoundError)
               break
            }
         }
      }
      ErrorHandler(error, doc, next)
   } else {
      next()
   }
}

const ErrorCardHandler = function (error, doc, next) {
   if (error) {
      if (error.name === 'CastError') {
         switch (error.path) {
            case '_id': {
               next(Errors.cardError.notFoundError)
               break
            }
         }
      }
      ErrorHandler(error, doc, next)
   } else {
      next()
   }
}

module.exports = { ErrorHandler, ErrorTravelHandler, ErrorCardHandler }
