const router = require('express').Router()
const CardModel = require('../../models/card.js')
const FileModel = require('../../models/file.js')
const TravelModel = require('../../models/travel.js')
const PayerModel = require('../../models/payer.js')
const fileMiddleware = require('../../middlewares/file.js')
const asyncHandler = require('express-async-handler')
const fileRouter = require('./file')
const payerRouter = require('./payer')

const mock = require('../mock-id')

router.use('/file', fileRouter)
router.use('/payer', payerRouter)

router.post(
   '/',
   asyncHandler(async (req, res) => {
      req.body.travelId = mock.TRAVELID
      let travelId = req.body.travelId
      let newCard = await CardModel.create(req.body)
      await TravelModel.findByIdAndUpdate(travelId, { $push: { cards: newCard.id } })
      res.json(newCard)
   })
)
router.put(
   '/',
   asyncHandler(async (req, res) => {
      const card = { ...req.body }
      delete card.users
      delete card.files
      delete card.payers
      res.json(await CardModel.findByIdAndUpdate(card._id, card, { new: true }))
   })
)
router.delete(
   '/:cardId',
   asyncHandler(async (req, res) => {
      const { cardId } = req.params
      let deletedCard = await CardModel.findByIdAndRemove(cardId)
      await TravelModel.findByIdAndUpdate(deletedCard.travelId, { $pull: { cards: cardId } })
      res.json(deletedCard)
   })
)
router.get(
   '/:cardType/:travelId',
   asyncHandler(async (req, res) => {
      const { cardType } = req.params
      res.json(await CardModel.getCardsByCardType(cardType, mock.TRAVELID))
   })
)

module.exports = router
