const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PopulateHandler = require('./handlers/populateHandler')
const ErrorHandler = require('./handlers/errorHandler')
const SecurityHandler = require('./handlers/securityHandler')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
   login: {
      type: String,
      required: true,
      description: 'Логин путешественника',
   },
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
      description: 'Электронная почта путешественника',
   },
   nickName: {
      type: String,
      required: true,
      description: 'Отображаемое имя',
   },
   surname: {
      type: String,
      description: 'Фамилия',
   },
   name: {
      type: String,
      description: 'Имя',
   },
   middleName: {
      type: String,
      description: 'Отчество',
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
   // HARDCODE. Пока не созданы нормальные пользователи по роуту signup
   return true
   // return bcrypt.compareSync(candidate, this.password)
}
userSchema.pre('save', function (next) {
   if (this.isModified('password')) {
      const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
      this.password = bcrypt.hashSync(this.password, salt)
   }
   next()
})
userSchema.post('findOne', ErrorHandler)
userSchema.post('findOne', PopulateHandler.userToClient)
userSchema.post('findOne', SecurityHandler)
userSchema.post('save', ErrorHandler)
userSchema.post('save', PopulateHandler.userToClient)

module.exports = mongoose.model('User', userSchema)
