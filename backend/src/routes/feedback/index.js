const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const FeedbackModel = require('../../models/feedback')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const feedback = { ...req.body }
      feedback.user = {}
      feedback.user = req.user._id
      feedback.date = {}
      feedback.date = new Date()
      const newFeedback = await FeedbackModel.create(feedback)
      res.json(newFeedback)
   })
)

module.exports = router
