const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const FeedbackModel = require('../../models/feedback')

router.post(
   '/',
   asyncHandler(async (req, res, next) => {
      const feedback = { ...req.body }
      feedback.user = req.user._id
      feedback.date = new Date()
      req.data = await FeedbackModel.create(feedback)
      next()
   })
)

module.exports = router
