const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const FeedbackModel = require('../../models/feedback')
const Errors = require('../../models/types/errors')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const feedback = { ...req.body }
      feedback.user = req.user._id
      feedback.date = new Date()
      res.json({
         data: await FeedbackModel.create(feedback),
         ...Errors.success.feedbackSuccess,
      })
   })
)

module.exports = router
