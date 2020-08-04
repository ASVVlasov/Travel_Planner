const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const FeedbackModel = require('../../models/feedback')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const feedback = { ...req.body }
      feedback.user = req.user._id
      feedback.date = new Date()
      res.json({
         data: await FeedbackModel.create(feedback),
         message: 'Мы получили ваше сообщение — спасибо за обратную связь, она помогает нам развиваться ‍🎓‍',
      })
   })
)

module.exports = router
