const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const CardModel = require('../../models/card')
const UserModel = require('../../models/user')
const TravelModel = require('../../models/travel')
const travelStatuses = require('../../models/types/enumTravelStatuses.js')
const travelStatusesValues = Object.values(travelStatuses)
const userRouter = require('./user')

router.use('/user', userRouter)

router.get(
   '/:travelId',
   asyncHandler(async (req, res) => {
      const { travelId } = req.params
      res.json({ data: await TravelModel.findOne({ _id: travelId }) })
   })
)
router.post(
   '/',
   asyncHandler(async (req, res) => {
      const travel = { ...req.body }
      if (travel.users.indexOf(req.user.id) === -1) {
         travel.users.push(req.user._id)
      }
      travel.owner = req.user._id
      const newTravel = await TravelModel.create(travel)
      const update = { $push: { travels: newTravel.id } }
      for (const user of newTravel.users) {
         await UserModel.findByIdAndUpdate(user._id, update, { new: true })
      }
      res.json({ data: newTravel })
   })
)

router.put(
   '/',
   asyncHandler(async (req, res) => {
      const travelModel = req.body
      // Если travelModel.status не входит в массив возможных значений
      if (travelStatusesValues.indexOf(travelModel.status) === -1) {
         delete travelModel.status
      }
      res.json({ data: await TravelModel.updateTravel(travelModel) })
   })
)

// TODO remove child files of cards
router.delete(
   '/:travelId',
   asyncHandler(async (req, res) => {
      const { travelId } = req.params
      const { _id } = req.user
      let travel = await TravelModel.findById(travelId)
      if (await TravelModel.isOwner(travel, _id)) {
         res.json({ data: await TravelModel.deleteTravel(travel) })
      } else {
         res.json({ data: await TravelModel.leaveTravel(travel, _id) })
      }
   })
)
module.exports = router
