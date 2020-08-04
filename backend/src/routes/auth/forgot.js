const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const UserModel = require('../../models/user')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const user = await UserModel.restorePassword(req.body.email)
      res.json({ data: JSON.parse(JSON.stringify(user)) })
   })
)
module.exports = router
