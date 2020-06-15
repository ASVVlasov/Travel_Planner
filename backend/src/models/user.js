const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PopulateHandler = require('./handlers/populateHandler')
const ErrorHandler = require('./handlers/errorHandler')
const UniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
   password: {
      type: String,
      required: true,
      description: 'Пароль путешественника',
   },
   avatar: {
      type: mongoose.ObjectId,
      description: 'ID файла аватарки путешественника',
      ref: 'File',
   },
   email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      description: 'Электронная почта путешественника',
   },
   nickName: {
      type: String,
      description: 'Отображаемое имя',
   },
   surname: {
      type: String,
      description: 'Фамилия',
      default: '',
   },
   name: {
      type: String,
      description: 'Имя',
      default: '',
   },
   middleName: {
      type: String,
      description: 'Отчество',
      default: '',
   },
   birthDate: {
      type: Date,
      description: 'Дата рождения',
   },
   contacts: [
      {
         type: mongoose.ObjectId,
         description: 'ID друзей путешественника',
         ref: 'User',
      },
   ],
   travels: [
      {
         type: mongoose.ObjectId,
         description: 'ID досок путешествий, в которых принимает участие user',
         ref: 'Travel',
      },
   ],
})

userSchema.methods.comparePassword = function (candidate) {
   return bcrypt.compareSync(candidate, this.password)
}
userSchema.pre('save', function (next) {
   if (!this.nickName) {
      this.nickName = this.email.split('@')[0]
   }
   if (this.isModified('password')) {
      const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
      this.password = bcrypt.hashSync(this.password, salt)
   }
   next()
})

userSchema.post('findOne', ErrorHandler.ErrorHandler)
userSchema.post('findOne', PopulateHandler.userToClient)
userSchema.post('findOneAndUpdate', ErrorHandler.ErrorHandler)
userSchema.post('findOneAndUpdate', PopulateHandler.userToClient)
userSchema.post('save', ErrorHandler.ErrorHandler)
userSchema.post('save', PopulateHandler.userToClient)

userSchema.plugin(UniqueValidator)

module.exports = mongoose.model('User', userSchema)
