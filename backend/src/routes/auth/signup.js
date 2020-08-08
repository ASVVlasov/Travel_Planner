const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const Errors = require('../../models/types/errors')
const UserModel = require('../../models/user')
const RegistrationModel = require('../../models/registration')

router
   .post(
      '/:linkId',
      asyncHandler(async (req, res) => {
         const invite = await RegistrationModel.findById(req.params.linkId)
         if (!invite) {
            throw Errors.authError.notFoundError
         }
         const user = await UserModel.findById(invite.user)
         user.password = req.body.password
         await user.save()
         await RegistrationModel.findByIdAndDelete(invite.id)
         const plainUser = JSON.parse(JSON.stringify(user))
         delete plainUser.password
         res.json({
            data: plainUser,
            message: Errors.success.authSuccess.message,
            type: Errors.success.authSuccess.type,
         })
      })
   )
   .get(
      '/:linkId',
      asyncHandler(async (req, res) => {
         const invite = await RegistrationModel.findById(req.params.linkId)
         if (!invite) {
            throw Errors.authError.notFoundError
         }
         const user = await UserModel.findById(invite.user)
         const plainUser = JSON.parse(JSON.stringify(user))
         delete plainUser.password
         res.json({
            data: plainUser,
         })
      })
   )
   .post(
      '/',
      asyncHandler(async (req, res) => {
         const user = await UserModel.findOne({ email: req.body.email })
         if (user) {
            throw Errors.authError.emailExistError
         }
         await UserModel.createUser(req.body, req)
         res.json(Errors.success.signupSuccess)
      })
   )
module.exports = router
