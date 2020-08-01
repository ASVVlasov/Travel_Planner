const express = require('express')
const router = express.Router()
const token = require('../../middlewares/token')
const asyncHandler = require('express-async-handler')

router.get(
   '/',
   asyncHandler(async (req, res, next) => {
      let currentUser = req.user
      await token
         .check(req, res)
         .then((user) => {
            if (user._id === currentUser._id) {
               res.clearCookie('token')
            }
         })
         .catch((err) => {})
      req.logout()
      res.clearCookie('connect.sid')
      req.data = { success: true }
      next()
   })
)

module.exports = router
