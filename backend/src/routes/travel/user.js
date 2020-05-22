const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const TravelModel = require('../../models/travel')
const UserModel = require('../../models/user')
const createError = require('http-errors')
const mock = require('../mock-id')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      const user = await UserModel.findById(userId)
      if (!user) {
         throw createError(400, 'нет такого пользователя')
      }
      const update = { $push: { users: userId } }
      res.json(await TravelModel.findByIdAndUpdate(mock.TRAVELID, update))
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      const update = { $pull: { users: userId } }
      res.json(await TravelModel.findByIdAndUpdate(mock.TRAVELID, update))
   })
)

module.exports = router
