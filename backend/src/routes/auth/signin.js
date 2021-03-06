const express = require('express')
const router = express.Router()
const passport = require('../../middlewares/passport')
const cookieHandler = require('../../middlewares/cookieHandler')
const AsyncHandler = require('express-async-handler')
const RegistrationModel = require('../../models/registration')
const UserModel = require('../../models/user')
const Errors = require('../../models/types/errors')

router.post(
   '/',
   // Установка куки по "Запомнить меня!"
   cookieHandler,
   // Авторизация по паспорту
   AsyncHandler(passport.authenticate),
   AsyncHandler(async (req, res) => {
      res.json({ data: req.user })
   })
)
router.post(
   '/:linkId',
   AsyncHandler(async (req, res, next) => {
      const invite = await RegistrationModel.findById(req.params.linkId)
      if (!invite) {
         throw Errors.authError.notFoundError
      }
      const user = await UserModel.findById(invite.user)
      await RegistrationModel.findByIdAndDelete(invite.id)
      const plainUser = JSON.parse(JSON.stringify(user))
      delete plainUser.password
      req.user = plainUser
      res.json({
         data: req.user,
         ...Errors.success.confirmSuccess,
      })
   })
)

module.exports = router
