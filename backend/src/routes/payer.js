const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const PayerModel = require('../models/payer')
const CardModel = require('../models/card')
const createError = require('http-errors')
const travelId = '5eb9a8ae468c2a28eb4220f0'
const userId = '5eb9a98ac82bd95234d9ccd4'

router.get(
   '/:travelId',
   asyncHandler(async (req, res) => {
      const cards = await CardModel.findPayedCardsByUserId({ travelId, userId })
      let summary = {
         budget: 0,
         paid: 0,
         toPay: 0,
      }
      cards.forEach((card) => {
         const payInfo = card.payers.find((payer) => payer.user.id === userId)
         const costForOne = Math.round(card.cost / card.payers.length)
         summary.budget += costForOne
         summary.paid += payInfo.isPayer ? card.cost : payInfo.hasPayed ? costForOne : 0
         summary.toPay += payInfo.isPayer ? 0 : payInfo.hasPayed ? 0 : costForOne
      })
      res.json(summary)
   })
)

router.put(
   '/',
   asyncHandler(async (req, res) => {
      const payer = req.body
      const payers = await PayerModel.find({ cardId: payer.cardId })
      if (!payers.find((payer) => payer.isPayer)) {
         res.json(await PayerModel.findOneAndUpdate({ _id: payer._id }, payer, { new: true }))
      } else {
         throw createError(400, 'Эту карточку уже оплатили')
      }
   })
)

module.exports = router
