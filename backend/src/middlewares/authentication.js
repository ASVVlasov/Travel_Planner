const token = require('./token')
const Errors = require('../models/types/errors')
const asyncHandler = require('express-async-handler')

const authenticate = asyncHandler(async (req, res, next) => {
   if (!!req.user) {
      next() // Сначала сессия
   } else {
      req.user = await token.check(req, res)
      if (!req.user) throw Errors.authError.wrongTokenError
      next()
   }
})

module.exports = authenticate
