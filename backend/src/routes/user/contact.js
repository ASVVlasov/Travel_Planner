const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const UserModel = require('../../models/user')
const createError = require('http-errors')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const { email } = req.body
      const user = await UserModel.findOne({ email })
      if (user) {
         if (req.user.contacts.find((c) => c.id === user.id)) {
            throw createError(400, 'Такой пользователь уже есть в контактах')
         }
         const update = { $push: { contacts: user.id } }
         res.json(await UserModel.findByIdAndUpdate(req.user._id, update, { new: true }))
      } else {
         throw createError(404, 'пользователь не найден')
      }
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const { userId } = req.body
      let update = { $pull: { contacts: userId } }
      res.json(await UserModel.findByIdAndUpdate(req.user._id, update, { new: true }))
   })
)

router.get(
   '/',
   asyncHandler(async (req, res) => {
      res.json((await UserModel.findOne({ _id: req.user._id })).contacts)
   })
)

module.exports = router
