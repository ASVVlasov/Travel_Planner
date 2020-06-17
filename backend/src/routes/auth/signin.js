const express = require('express')
const router = express.Router()
const passport = require('../../middlewares/passport')
const cookieHandler = require('../../middlewares/cookieHandler')
const AsyncHandler = require('express-async-handler')
router.post(
   '/',
   // Установка куки по "Запомнить меня!"
   cookieHandler,
   // Авторизация по паспорту
   AsyncHandler(passport.authenticate),
   (req, res) => {
      res.json({ auth: true })
   }
)

module.exports = router
