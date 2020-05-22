const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const CardModel = require('../../models/card')
const TravelModel = require('../../models/travel')
const mock = require('../mock-id')
const userRouter = require('./user')

router.use('/user', userRouter)

router.get(
   '/:travelId',
   asyncHandler(async (req, res) => {
      res.json(await TravelModel.findOne({ _id: mock.TRAVELID }))
   })
)
router.post(
   '/',
   asyncHandler(async (req, res) => {
      res.json(await TravelModel.create(req.body))
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
      await CardModel.deleteCards(mock.TRAVELID)
      const travel = await TravelModel.findByIdAndRemove(mock.TRAVELID)
      res.json(travel)
   })
)

module.exports = router
