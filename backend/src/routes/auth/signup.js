const express = require('express')
const router = express.Router()
const UserModel = require('../../models/user')
const asyncHandler = require('express-async-handler')
const Errors = require('../../models/types/errors')

router.post(
   '/',
   asyncHandler(async (req, res, next) => {
      const user = UserModel.findOne({ email: req.body.email })
      if (user) {
         throw Errors.authError.emailExistError
      }
      const newCard = new UserModel(req.body)
      await newCard.save()
      res.json({ success: true })
   })
)

module.exports = router
