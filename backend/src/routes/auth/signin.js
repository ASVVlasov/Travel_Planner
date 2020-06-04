const express = require('express')
const router = express.Router()
const passport = require('../../middlewares/passport')
const cookieHandler = require('../../middlewares/cookieHandler')
router.post(
   '/',
   // Установка куки по "Запомнить меня!"
   cookieHandler,
   // Авторизация по паспорту
   passport.authenticate,
   (req, res) => {
      res.json({ auth: true })
   }
)

module.exports = router
