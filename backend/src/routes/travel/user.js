const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const TravelModel = require('../../models/travel')
const travelStatuses = require('../../models/types/enumTravelStatuses')
const UserModel = require('../../models/user')
const createError = require('http-errors')

router.post(
   '/',
   asyncHandler(async (req, res, next) => {
      const { travelId, userId } = req.body
      const travel = await TravelModel.pushUser(travelId, userId)
      await UserModel.findByIdAndUpdate(userId, { $push: { travels: travelId } })
      req.data = travel
      next()
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res, next) => {
      const { travelId, userId } = req.body
      let travel = await TravelModel.findById(travelId)
      if (travel.status === travelStatuses.ARCHIVE) {
         req.data = travel
      } else {
         await UserModel.findByIdAndUpdate(userId, { $pull: { travels: travelId } })
         travel.users.pull(userId)
         await travel.save()
         req.data = travel
      }
      next()
   })
)

module.exports = router
