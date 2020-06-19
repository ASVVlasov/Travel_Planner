const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Errors = require('../models/types/errors')

const save = async (req, res) => {
   const { email, password } = req.body
   const user = await User.findOne({
      email,
   })
   if (!user) {
      throw Errors.authError.emailNotFoundError
   }
   if (user && user.comparePassword(password)) {
      const plainUser = JSON.parse(JSON.stringify(user))
      delete plainUser.password
      let tokenValue = jwt.sign(plainUser, process.env.TOKEN_SECRET_KEY)
      res.cookie('token', tokenValue, {
         maxAge: 30 * 24 * 3600 * 1000,
      })
   } else {
      throw Errors.authError.passwordWrongError
   }
}

const check = async (req, res) => {
   if (!req.cookies) {
      throw Errors.authError.tokenNotFoundError
   }
   return jwt.verify(req.cookies.token, process.env.TOKEN_SECRET_KEY)
}

module.exports = {
   save,
   check,
}
