const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const PayerModel = require('../models/payer')
const CardModel = require('../models/card')
const travelId = '5eb9a8ae468c2a28eb4220f0'
const userId = '5eb9a98ac82bd95234d9ccd4'

router.get(
   '/summary/:travelId',
   asyncHandler(async (req, res) => {
      res.json(await CardModel.summaryForPays({ travelId, userId }))
   })
)

router.put(
   '/',
   asyncHandler(async (req, res) => {
      const payer = req.body
      if (payer.isPayer) {
         payer.hasPayed = true
      }
      res.json(await PayerModel.findOneAndUpdate({ _id: payer._id }, payer, { new: true }))
   })
)

module.exports = router
