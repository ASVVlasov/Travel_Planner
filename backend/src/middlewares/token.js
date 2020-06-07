const User = require('../models/user')
const jwt = require('jsonwebtoken')

const save = async (req, res) => {
   const { email, password } = req.body
   const user = await User.findOne({
      email,
   })
   if (user && user.comparePassword(password)) {
      const plainUser = JSON.parse(JSON.stringify(user))
      delete plainUser.password
      let tokenValue = jwt.sign(plainUser, process.env.TOKEN_SECRET_KEY)
      res.cookie('token', tokenValue, {
         maxAge: 30 * 24 * 3600 * 1000,
      })
   }
}

const check = async (req, res) => {
   return new Promise((resolve, reject) => {
      if (!req.cookies) {
         let err = JSON.stringify({
            message: 'Токен отсутствует',
         })
         reject(err)
      }
      jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY, (err, payload) => {
         if (err) {
            let err = JSON.stringify({
               message: 'Неправильный токен',
            })
            reject(err)
         }
         let user = payload
         delete user.iat
         resolve(user)
      })
   })
}

module.exports = {
   save,
   check,
}
