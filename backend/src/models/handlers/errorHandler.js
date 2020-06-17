const createError = require('http-errors')
const Errors = require('../types/errors')

const ErrorHandler = function (error, doc, next) {
   if (error) {
      next(createError(error.status, error.message, { type: error.type }))
   } else {
      next()
   }
}
const ErrorByModel = function (error, message) {
   if (error.name === 'CastError') {
      switch (error.path) {
         case '_id': {
            next(message.notFoundError)
            break
         }
      }
   }
}
const ErrorTravelHandler = function (error, doc, next) {
   if (error) {
      ErrorByModel(Errors.travelError)
      ErrorHandler(error, doc, next)
   } else {
      next()
   }
}

const ErrorCardHandler = function (error, doc, next) {
   if (error) {
      ErrorByModel(Errors.cardError)
      ErrorHandler(error, doc, next)
   } else {
      next()
   }
}

const ErrorFeedbackHandler = function (error, doc, next) {
   if (error) {
      ErrorByModel(Errors.feedbackError)
      ErrorHandler(error, doc, next)
   } else {
      next()
   }
}

module.exports = { ErrorHandler, ErrorTravelHandler, ErrorCardHandler, ErrorFeedbackHandler }
