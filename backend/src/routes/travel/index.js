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
      let travel = await TravelModel.findById(travelId)
      if (travel.status === travelStatuses.ARCHIVE) {
         res.json({ message: 'Поездка прошла, поэтому вы не можете ее покинуть.' })
      } else {
         travel.users.pull(req.user.id)
         travel.save()
         if (!travel.users.length) {
            await CardModel.deleteCards(travelId)
            travel = await TravelModel.findByIdAndRemove(travelId)
         } else {
            await CardModel.removeUser(travelId, req.user.id)
         }
         await UserModel.findByIdAndUpdate(req.user.id, { $pull: { travels: travelId } })
         res.json(travel)
      }
   })
)
module.exports = router
