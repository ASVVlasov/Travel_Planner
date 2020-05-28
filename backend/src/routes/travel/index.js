const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const CardModel = require('../../models/card')
const UserModel = require('../../models/user')
const TravelModel = require('../../models/travel')
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
      travel.users.push(req.user)
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
      await CardModel.deleteCards(travelId)
      const travel = await TravelModel.findByIdAndRemove(travelId)
      res.json(travel)
   })
)

module.exports = router
