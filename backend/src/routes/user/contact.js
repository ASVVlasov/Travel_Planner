const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const UserModel = require('../../models/user')

const mock = require('../mock-id')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const { userId } = req.body
      let update = { $push: { contacts: userId } }
      res.json(await UserModel.findByIdAndUpdate(req.user._id, update, { new: true }))
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
