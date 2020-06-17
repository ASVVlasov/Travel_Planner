const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Errors = require('./types/errors')
const ErrorHandler = require('./handlers/errorHandler')

const feedbackSchema = new Schema({
   user: {
      type: mongoose.ObjectId,
      required: true,
      description: 'Пользователь, оставивший комментарий',
      ref: 'User',
   },
   comment: {
      type: String,
      required: true,
      description: 'Комментарий пользователя',
   },
})

feedbackSchema.pre('save', function (next) {
   if (this.comment === '') {
      next(Errors.feedbackError.isEmptyError)
   } else {
      next()
   }
})

feedbackSchema.post('findOne', ErrorHandler.ErrorHandler)
feedbackSchema.post('save', ErrorHandler.ErrorHandler)

module.exports = mongoose.model('Feedback', feedbackSchema)
