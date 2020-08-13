const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const TravelModel = require('../../models/travel')
const travelStatuses = require('../../models/types/enumTravelStatuses')
const UserModel = require('../../models/user')
const createError = require('http-errors')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      const travel = await TravelModel.pushUser(travelId, userId)
      await UserModel.findByIdAndUpdate(userId, { $push: { travels: travelId } })
      res.json({ data: travel })
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      let travel = await TravelModel.findById(travelId)
      if (await TravelModel.isOwner(travel, userId)) {
         res.json({ data: await TravelModel.deleteTravel(travel) })
      } else {
         res.json({ data: await TravelModel.leaveTravel(travelId, userId) })
      }
   })
)

module.exports = router
