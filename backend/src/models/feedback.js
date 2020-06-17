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
   date: {
      type: Date,
      description: 'Дата комментария',
   },
   comment: {
      type: String,
      required: true,
      description: 'Комментарий пользователя',
   },
})

feedbackSchema.pre('save', function (next) {
   this.date = new Date()
})

module.exports = mongoose.model('Feedback', feedbackSchema)
