const express = require('express')
const router = express.Router()
const UserModel = require('../../models/user')
const asyncHandler = require('express-async-handler')
const passport = require('../../middlewares/passport')
const cookieHandler = require('../../middlewares/cookieHandler')

router.post(
   '/',
   asyncHandler(async (req, res, next) => {
      let newCard = new UserModel(req.body)
      await newCard.save()
      next()
   }),
   cookieHandler,
   passport.authenticate,
   (req, res) => {
      res.send()
   }
)

module.exports = router
