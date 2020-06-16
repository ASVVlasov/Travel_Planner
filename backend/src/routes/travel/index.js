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
         travel.users.push(req.user._id)
      }
      const newTravel = new TravelModel(travel)
      await newTravel.save()
      const update = { $push: { travels: newTravel._id } }
      for (const user of newTravel.users) {
         await UserModel.findByIdAndUpdate(user._id, update, { new: true })
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
      res.json(await TravelModel.updateTravel(travelModel))
   })
)

// TODO remove child files of cards
router.delete(
   '/:travelId',
   asyncHandler(async (req, res) => {
      const { travelId } = req.params
      let travel = await TravelModel.findById(travelId)
      if (travel.status === travelStatuses.ARCHIVE) {
         res.json({ message: 'Поездка прошла, поэтому вы не можете ее покинуть.' })
      } else {
         travel.users.pull(req.user._id)
         travel.save()
         if (!travel.users.length) {
            await CardModel.deleteCards(travelId)
            travel = await TravelModel.findByIdAndRemove(travelId)
         } else {
            await CardModel.removeUser(travelId, req.user.id)
         }
         await UserModel.findByIdAndUpdate(req.user._id, { $pull: { travels: travelId } })
         res.json(travel)
      }
   })
)
module.exports = router
