const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PopulateHandler = require('./handlers/populateHandler')
const StatusHandler = require('./handlers/statusHandler')
const CommonHandler = require('./handlers/commonHandlers')
const ErrorHandler = require('./handlers/errorHandler')
const RegistrationModel = require('./registration')
const UniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')
const nodeMailer = require('nodemailer')
const EmailText = require('./types/email')
const Errors = require('./types/errors')

const userSchema = new Schema({
   password: {
      type: String,
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

userSchema.statics.invite = async function (email, req) {
   const inviteUser = {
      email,
      password: '',
   }
   const newUser = await this.create(inviteUser)
   inviteUser.user = newUser.id
   let registrationModel = await RegistrationModel.findOne({ user: newUser })
   if (registrationModel) {
      await registrationModel.delete()
   }
   registrationModel = await RegistrationModel.create(inviteUser)
   const { nickName, surname, name } = req.user
   const requester = name || surname ? `${name} ${surname}`.trim() : nickName
   await this.sendEmail(
      newUser.email,
      '🙋‍♀️🙋‍♂️ Ваш друг приглашает вас в путешествие!',
      EmailText.inviteHTML(registrationModel.id, req.headers.referer, requester),
      true
   )
   return newUser
}

userSchema.statics.restorePassword = async function (email, req) {
   const forgetfulUser = await this.findOne({ email })
   if (!forgetfulUser) {
      throw Errors.userError.notFoundError
   }
   let registrationModel = await RegistrationModel.findOne({ user: forgetfulUser })
   if (!registrationModel) {
      registrationModel = await RegistrationModel.create({
         email: forgetfulUser.email,
         password: '',
         user: forgetfulUser,
      })
   }
   await this.sendEmail(
      forgetfulUser.email,
      '🔓 Запрос на смену пароля',
      EmailText.forgotHTML(registrationModel.id, req.headers.referer)
   )
   return forgetfulUser
}

userSchema.statics.createUser = async function (userModel, req) {
   const regUserInfo = {
      email: userModel.email,
      password: userModel.password,
   }
   const newUser = await this.create(userModel)
   regUserInfo.user = newUser.id
   const registrationModel = await RegistrationModel.create(regUserInfo)
   await this.sendEmail(
      newUser.email,
      '🎉 Добро пожаловать в TravelKeeper!',
      EmailText.registrationHTML(registrationModel.id, req.headers.referer),
      true
   )
   return newUser
}
userSchema.statics.sendEmail = async function (email, subject, html, removeUser = false) {
   const transporter = nodeMailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
         user: process.env.EMAIL_LOGIN,
         pass: process.env.EMAIL_PASSWORD,
      },
   })

   return new Promise((resolve, reject) => {
      transporter.sendMail(
         {
            from: `Сервис TravelKeeper <${process.env.EMAIL_LOGIN}>`,
            to: email,
            subject,
            html,
         },
         async (error, response) => {
            if (error) {
               if (removeUser) {
                  const user = this.findOne({ email })
                  const registration = RegistrationModel.findOne({ user })
                  await user.delete()
                  await registration.delete()
               }
               if (error.responseCode === 550) {
                  reject(Errors.authError.regEmailSentError)
               } else {
                  reject(error)
               }
            }
            resolve(response)
         }
      )
   })
}
userSchema.pre('save', function (next) {
   if (!this.nickName) {
      this.nickName = this.email.split('@')[0]
   }
   if (this.isModified('password') && this.password !== '') {
      const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
      this.password = bcrypt.hashSync(this.password, salt)
   }
   next()
})

userSchema.post('findOne', StatusHandler.handleUser)
userSchema.post('findOne', ErrorHandler.ErrorHandler)
userSchema.post('findOne', PopulateHandler.userToClient)
userSchema.post('findOneAndUpdate', ErrorHandler.ErrorHandler)
userSchema.post('findOneAndUpdate', PopulateHandler.userToClient)
userSchema.post('findOneAndUpdate', StatusHandler.handleUser)
userSchema.post('save', ErrorHandler.ErrorHandler)
userSchema.post('save', PopulateHandler.userToClient)
userSchema.post('save', StatusHandler.handleUser)

userSchema.plugin(UniqueValidator)

module.exports = mongoose.model('User', userSchema)
