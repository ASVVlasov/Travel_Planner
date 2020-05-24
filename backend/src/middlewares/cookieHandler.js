const token = require('./token')
const asyncHandler = require('express-async-handler')

// Установка куки по "Запомнить меня!"
const cookieHandler = asyncHandler(async (req, res, next) => {
   if (!!req.body.rememberMe) {
      token.save(req, res)
   } else next()
})

module.exports = cookieHandler
