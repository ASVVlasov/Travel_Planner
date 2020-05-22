const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const UserModel = require('../../models/user')

const mock = require('../mock-id')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      // TODO: после добавления авторизации выпилить selfId
      let sefId = mock.SELFID
      const { userId } = req.body
      let update = { $push: { contacts: userId } }
      res.json(await UserModel.findByIdAndUpdate(selfId, update, { new: true }))
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      // TODO: после добавления авторизации выпилить selfId
      let sefId = mock.SELFID
      const { userId } = req.body
      let update = { $pull: { contacts: userId } }
      res.json(await UserModel.findByIdAndUpdate(selfId, update, { new: true }))
   })
)

router.get(
   '/',
   asyncHandler(async (req, res) => {
      // TODO: после добавления авторизации выпилить selfId
      const selfId = mock.SELFID
      res.json((await UserModel.findOne({ _id: selfId })).contacts)
   })
)

module.exports = router
