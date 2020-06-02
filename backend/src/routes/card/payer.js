const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const PayerModel = require('../../models/payer')
const CardModel = require('../../models/card')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const { cardId, userId } = req.body
      let newPayer = new PayerModel({
         user: userId,
         cardId: cardId,
         isPayer: false,
         hasPayed: false,
      })
      await newPayer.save()
      let update = { $push: { payers: newPayer._id } }
      res.json(await CardModel.findByIdAndUpdate(cardId, update, { new: true }))
   })
)
router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const { cardId, userId } = req.body
      let filter = { user: userId, cardId: cardId }
      let deletedPayer = await PayerModel.findOneAndDelete(filter)
      let update = { $pull: { payers: deletedPayer._id } }
      res.json(await CardModel.findByIdAndUpdate(cardId, update, { new: true }))
   })
)

router.put(
   '/',
   asyncHandler(async (req, res) => {
      const payer = req.body
      if (payer.isPayer) {
         payer.hasPayed = true
      }
      await PayerModel.findOneAndUpdate({ _id: payer._id }, payer, { new: true })

      res.json(await CardModel.findById(payer.cardId))
   })
)

router.get(
   '/summary/:travelId',
   asyncHandler(async (req, res) => {
      let { travelId } = req.params
      res.json(await CardModel.summaryForPays({ travelId: travelId, userId: req.user.id }))
   })
)

module.exports = router
