const token = require('./token')

const authenticate = async (req, res, next) => {
   if (!!req.user) {
      next() // Сначала сессия
   } else {
      token
         .check(req, res)
         .then((user) => {
            req.user = user
            next() // Потом токен
         })
         .catch((err) => {
            res.status(401).send(err)
         })
   }
}

module.exports = authenticate
