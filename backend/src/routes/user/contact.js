const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const UserModel = require('../../models/user')
const createError = require('http-errors')
const Errors = require('../../models/types/errors')

router.post(
   '/',
   asyncHandler(async (req, res, next) => {
      const { userId } = req.body
      const update = { $push: { contacts: userId } }
      req.data = await UserModel.findByIdAndUpdate(req.user._id, update, { new: true })
      next()
   })
)

router.post(
   '/search',
   asyncHandler(async (req, res, next) => {
      const { email } = req.body
      const user = await UserModel.findOne({ email })
      if (user) {
         if (req.user.contacts.find((c) => c.id === user.id)) {
            throw Errors.userError.duplicateUser
         }
         req.data = user
      } else {
         throw Errors.userError.notFoundError
      }
      next()
   })
)

router.post(
   '/invite',
   asyncHandler(async (req, res, next) => {
      const { email } = req.body
      const invitedUser = await UserModel.invite(email, req)
      const update = { $push: { contacts: invitedUser._id } }
      req.data = await UserModel.findByIdAndUpdate(req.user._id, update, { new: true })
      req.message = 'Друг получит приглашение на указанную почту, а пока мы добавили его в ваши контакты 😌'
      next()
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res, next) => {
      const { userId } = req.body
      let update = { $pull: { contacts: userId } }
      req.data = await UserModel.findByIdAndUpdate(req.user._id, update, { new: true })
      next()
   })
)

router.get(
   '/',
   asyncHandler(async (req, res, next) => {
      req.data = (await UserModel.findOne({ _id: req.user._id })).contacts
      next()
   })
)

module.exports = router
