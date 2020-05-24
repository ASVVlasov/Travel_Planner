const passport = require('passport')
const Strategy = require('passport-local').Strategy
const UserModel = require('../models/user')

passport.use(
   new Strategy(
      {
         usernameField: 'login',
         passwordField: 'password',
      },
      async (login, password, done) => {
         const user = await UserModel.findOne({
            login: login,
         })
         if (!user || !user.comparePassword(password)) {
            return done(null, false) // error, not auth
         }
         const plainUser = JSON.parse(JSON.stringify(user))
         delete plainUser.password
         done(null, plainUser) // req.user
      }
   )
)

passport.serializeUser((user, done) => {
   return done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
   const user = await UserModel.findById(id)
   const plainUser = JSON.parse(JSON.stringify(user))
   if (!!plainUser) {
      delete plainUser.password
      done(null, plainUser) // req.user
   } else {
      done(null, false)
   }
})

module.exports = {
   initialize: passport.initialize(),
   session: passport.session(),
   authenticate: passport.authenticate('local'),
   // authenticate: passport.authenticate('local', { successRedirect: '/user' }),
}
