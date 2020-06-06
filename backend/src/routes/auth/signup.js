const express = require('express')
const router = express.Router()
const UserModel = require('../../models/user')
const asyncHandler = require('express-async-handler')

router.post(
   '/',
   asyncHandler(async (req, res, next) => {
      let newCard = new UserModel(req.body)
      await newCard.save()
      res.json({ success: true })
   })
)

module.exports = router
