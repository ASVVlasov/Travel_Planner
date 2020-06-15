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
      res.json(await TravelModel.findOne({ _id: travelId }))
   })
)
router.post(
   '/',
   asyncHandler(async (req, res) => {
      const travel = { ...req.body }
      if (travel.users.indexOf(req.user.id) === -1) {
         travel.users.push(req.user)
      }
      travel.owner = req.user.id
      const newTravel = new TravelModel(travel)
      await newTravel.save()
      const update = { $push: { travels: newTravel.id } }
      for (const user of newTravel.users) {
         await UserModel.findByIdAndUpdate(user.id, update)
      }
      res.json(newTravel)
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
      delete travelModel.cards
      delete travelModel.users
      res.json(await TravelModel.findByIdAndUpdate(travelModel._id, travelModel, { new: true }))
   })
)

// TODO remove child files of cards
router.delete(
   '/:travelId',
   asyncHandler(async (req, res) => {
      const { travelId } = req.params
      const { id } = req.user
      if ((await TravelModel.isOwner(travelId, id)) === true) {
         res.json(await TravelModel.deleteTravel(travelId))
      } else {
         res.json(await TravelModel.leaveTravel(travelId, id))
      }
   })
)
module.exports = router
