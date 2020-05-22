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
      const travel = await TravelModel.findById(mock.TRAVELID)
      if (travel.users.find((u) => u.id === userId)) {
         throw createError(400, 'такой пользователь уже есть в этом путешествии')
      }
      const update = { $push: { users: userId } }
      res.json(await TravelModel.findByIdAndUpdate(mock.TRAVELID, update, { new: true }))
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      const update = { $pull: { users: userId } }
      res.json(await TravelModel.findByIdAndUpdate(mock.TRAVELID, update, { new: true }))
   })
)

module.exports = router
