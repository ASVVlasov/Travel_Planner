const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const UserModel = require('../../models/user')
const createError = require('http-errors')
const Errors = require('../../models/types/errors')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const { userId } = req.body
      const update = { $push: { contacts: userId } }
      res.json({ data: await UserModel.findByIdAndUpdate(req.user._id, update, { new: true }) })
   })
)

router.post(
   '/search',
   asyncHandler(async (req, res) => {
      const { email } = req.body
      const user = await UserModel.findOne({ email })
      if (user) {
         if (req.user.contacts.find((c) => c.id === user.id)) {
            throw Errors.userError.duplicateUser
         }
         res.json({ data: user })
      } else {
         throw Errors.userError.notFoundError
      }
   })
)

router.post(
   '/invite',
   asyncHandler(async (req, res) => {
      const { email } = req.body
      const invitedUser = await UserModel.invite(email, req)
      const update = { $push: { contacts: invitedUser._id } }
      res.json({
         data: await UserModel.findByIdAndUpdate(req.user._id, update, { new: true }),
         message: 'Друг получит приглашение на указанную почту, а пока мы добавили его в ваши контакты 😌',
      })
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const { userId } = req.body
      let update = { $pull: { contacts: userId } }
      res.json({ data: await UserModel.findByIdAndUpdate(req.user._id, update, { new: true }) })
   })
)

router.get(
   '/',
   asyncHandler(async (req, res) => {
      res.json({ data: (await UserModel.findOne({ _id: req.user._id })).contacts })
   })
)

module.exports = router
