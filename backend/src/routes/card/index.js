const router = require('express').Router()
const CardModel = require('../../models/card.js')
const TravelModel = require('../../models/travel.js')
const asyncHandler = require('express-async-handler')
const fileRouter = require('./file')
const payerRouter = require('./payer')

router.use('/file', fileRouter)
router.use('/payer', payerRouter)

router.post(
   '/',
   asyncHandler(async (req, res, next) => {
      const { travelId } = req.body
      const newCard = await CardModel.create(req.body)
      await TravelModel.findByIdAndUpdate(travelId, { $push: { cards: newCard.id } })
      req.data = newCard
      next()
   })
)
router.put(
   '/',
   asyncHandler(async (req, res, next) => {
      const card = { ...req.body }
      delete card.users
      delete card.files
      delete card.payers
      req.data = await CardModel.findByIdAndUpdate(card._id, card, { new: true })
      next()
   })
)
router.delete(
   '/:cardId',
   asyncHandler(async (req, res, next) => {
      const { cardId } = req.params
      let deletedCard = await CardModel.findByIdAndRemove(cardId)
      await TravelModel.findByIdAndUpdate(deletedCard.travelId, { $pull: { cards: cardId } })
      req.data = deletedCard
      next()
   })
)
router.get(
   '/:cardType/:travelId',
   asyncHandler(async (req, res, next) => {
      const { cardType, travelId } = req.params
      req.data = await CardModel.getCardsByCardType(cardType, travelId)
      next()
   })
)

module.exports = router
