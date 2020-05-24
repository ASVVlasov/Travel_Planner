const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const TravelModel = require('../../models/travel')
const createError = require('http-errors')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      const travel = await TravelModel.findById(travelId)
      if (travel.users.find((u) => u.id === userId) || !userId) {
         throw createError(400, 'неправильный userId')
      }
      const update = { $push: { users: userId } }
      res.json(await TravelModel.findByIdAndUpdate(travelId, update, { new: true }))
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      const update = { $pull: { users: userId } }
      res.json(await TravelModel.findByIdAndUpdate(travelId, update, { new: true }))
   })
)

module.exports = router
