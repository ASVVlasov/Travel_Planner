const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const TravelModel = require('../../models/travel')
const UserModel = require('../../models/user')
const createError = require('http-errors')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      const travel = await TravelModel.pushUser(travelId, userId)
      await UserModel.findByIdAndUpdate(userId, { $push: { travels: travelId } })
      res.json(travel)
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      await UserModel.findByIdAndUpdate(userId, { $pull: { travels: travelId } })
      const update = { $pull: { users: userId } }
      res.json(await TravelModel.findByIdAndUpdate(travelId, update, { new: true }))
   })
)

module.exports = router
