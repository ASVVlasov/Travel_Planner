const UserModel = require('../models/user')

const emulate = async (req, res, next) => {
   if (req.user) {
      next()
   }
   let emulatedUser = await UserModel.findById('5eb9a98ac82bd95234d9ccd4') //testNickName
   req.user = emulatedUser
   next()
}

module.exports = emulate
