const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const PayerModel = require('../../models/payer')
const CardModel = require('../../models/card')

router.post(
   '/',
   asyncHandler(async (req, res, next) => {
      const { cardId, userId } = req.body
      req.data = await CardModel.pushUser(cardId, userId)
      next()
   })
)
router.delete(
   '/',
   asyncHandler(async (req, res, next) => {
      const { cardId, userId } = req.body
      const filter = { user: userId, cardId: cardId }
      const deletedPayer = await PayerModel.findOneAndDelete(filter)
      const update = { $pull: { payers: deletedPayer._id } }
      req.data = await CardModel.findByIdAndUpdate(cardId, update, { new: true })
      next()
   })
)

router.put(
   '/',
   asyncHandler(async (req, res, next) => {
      const payer = req.body
      if (payer.isPayer) {
         payer.hasPayed = true
      }
      await PayerModel.findOneAndUpdate({ _id: payer._id }, payer, { new: true })

      req.data = await CardModel.findById(payer.cardId)
      next()
   })
)

router.get(
   '/summary/:travelId',
   asyncHandler(async (req, res, next) => {
      const { travelId } = req.params
      req.data = await CardModel.summaryForPays({ travelId: travelId, userId: req.user._id })
      next()
   })
)

module.exports = router
