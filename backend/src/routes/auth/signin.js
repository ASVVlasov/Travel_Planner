const express = require('express')
const router = express.Router()
const passport = require('../../middlewares/passport')
const cookieHandler = require('../../middlewares/cookieHandler')
const AsyncHandler = require('express-async-handler')
const RegistrationModel = require('../../models/registration')
const UserModel = require('../../models/user')

router.post(
   '/',
   // Установка куки по "Запомнить меня!"
   cookieHandler,
   // Авторизация по паспорту
   AsyncHandler(passport.authenticate),
   (req, res) => {
      res.json(req.user)
   }
)
router.post(
   '/:linkId',
   asyncHandler(async (req, res, next) => {
      const invite = await RegistrationModel.findById(req.params.linkId)
      if (!invite) {
         throw Errors.authError.notFoundError
      }
      await RegistrationModel.findByIdAndDelete(invite.id)
      const user = await UserModel.findById(invite.user)
      const plainUser = JSON.parse(JSON.stringify(user))
      delete plainUser.password
      res.json(plainUser)
   })
)

module.exports = router
