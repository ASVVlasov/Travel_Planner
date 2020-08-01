const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const UserModel = require('../../models/user')

router.post(
   '/',
   asyncHandler(async (req, res, next) => {
      const user = await UserModel.restorePassword(req.body.email)
      req.data = JSON.parse(JSON.stringify(user))
      next()
   })
)
module.exports = router
