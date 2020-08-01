const router = require('express').Router()
const UserModel = require('../../models/user')
const asyncHandler = require('express-async-handler')
const contactRouter = require('./contact')
const avatarRouter = require('./avatar')

router.use('/contact', contactRouter)
router.use('/avatar', avatarRouter)
router.get(
   '/',
   asyncHandler(async (req, res, next) => {
      const user = JSON.parse(JSON.stringify(await UserModel.findById(req.user._id)))
      delete user.password
      req.data = user
      next()
   })
)

router.put(
   '/',
   asyncHandler(async (req, res, next) => {
      const user = { ...req.body }
      user._id = req.user._id
      delete user.contacts
      delete user.travels
      delete user.email
      const updatedUser = JSON.parse(
         JSON.stringify(await UserModel.findByIdAndUpdate(req.user._id, user, { new: true }))
      )
      delete updatedUser.password
      req.data = updatedUser
      next()
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res, next) => {
      // TODO: выпилить selfId после добавления авторизации. Сейчас заведомо сфейлится
      const { selfId } = null
      let deletedUser
      if (!!selfId) {
         deletedUser = JSON.parse(JSON.stringify(await UserModel.findByIdAndRemove(req.user._id)))
      }
      delete deletedUser.password
      //TODO: Удаление пользователя из всех travel, cards, payer
      // либо замена его на dummyUser - по решению общего собрания
      // Либо вообще запретить удаление пользователей. Пусть будут вечными! %)
      req.data = deletedUser
      next()
   })
)

module.exports = router
