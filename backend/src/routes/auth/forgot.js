const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const UserModel = require('../../models/user')
const Errors = require('../../models/types/errors')
const RegistrationModel = require('../../models/registration')

router
   .post(
      '/',
      asyncHandler(async (req, res) => {
         const user = await UserModel.restorePassword(req.body.email, req)
         res.json({ data: JSON.parse(JSON.stringify(user)), ...Errors.success.forgotSuccess })
      })
   )
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
            ...Errors.success.changePasswordSuccess,
         })
      })
   )
module.exports = router
