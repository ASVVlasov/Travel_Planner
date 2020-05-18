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
      let cardId = newCard._id
      for (let index in newCard.users) {
         let user = newCard.users[index]
         let newPayer = new PayerModel({
            user: user._id,
            cardId: cardId,
            isPayer: false,
            hasPayed: false,
         })
         await newPayer.save()
         let update = { $push: { payers: newPayer._id } }
         await CardModel.findByIdAndUpdate(cardId, update)
      }
      await TravelModel.findByIdAndUpdate(travelId, { $push: { cards: cardId } })
      res.json(await CardModel.findById(cardId))
   })
)
router.get(
   '/:cardId/',
   asyncHandler(async (req, res) => {
      const { cardId } = req.params
      res.json(await CardModel.findById(cardId))
   })
)
router.get(
   '/:cardType/:travelId',
   asyncHandler(async (req, res) => {
      const { cardType } = req.params
      res.json(await CardModel.getCardsByCardType(cardType, mock.TRAVELID))
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
   asyncHandler(async (req, res, next) => {
      const { cardId } = req.params
      let deletedCard = await CardModel.findById(cardId)
      req.files = []
      for (let index in deletedCard.files) {
         let file = deletedCard.files[index]
         req.files.push((await FileModel.findById(file._id)).uploadName)
      }
      next()
   }),
   fileMiddleware.removeFiles,
   asyncHandler(async (req, res) => {
      const { cardId } = req.params
      let deletedCard = await CardModel.findByIdAndDelete(cardId)
      for (let payer in deletedCard.payers) {
         await PayerModel.findByIdAndDelete(payer._id)
      }
      await TravelModel.findByIdAndUpdate(deletedCard.travelId, { $pull: { cards: cardId } })
      res.json({ message: 'Card deleted!' })
   })
)

module.exports = router
