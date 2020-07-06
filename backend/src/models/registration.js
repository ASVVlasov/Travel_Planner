const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UniqueValidator = require('mongoose-unique-validator')

const registrationSchema = new Schema({
   user: {
      type: mongoose.ObjectId,
      unique: true,
      require: true,
      description: 'Приглашенный пользователь',
      ref: 'User',
   },
   createDate: {
      type: Date,
      description: 'Дата приглашения',
   },
})

registrationSchema.statics.hasExpired = function () {
   return new Date() - new Date(this.createDate) > 7 * 24 * 60 * 60 * 1000
}

registrationSchema.pre('save', function () {
   this.createDate = new Date()
})

registrationSchema.plugin(UniqueValidator)

module.exports = mongoose.model('Registration', registrationSchema)
