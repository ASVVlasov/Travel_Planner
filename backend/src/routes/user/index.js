const router = require('express').Router()
const UserModel = require('../../models/user')
const asyncHandler = require('express-async-handler')
const contactRouter = require('./contact')

router.use('/contact', contactRouter)

// Эммигрировал в auth/signup.js
// router.post(
//    '/',
//    asyncHandler(async (req, res) => {
//       let newUser = await UserModel.create(req.body)
//       res.json(newUser)
//    })
// )

router.get(
   '/',
   asyncHandler(async (req, res) => {
      res.json(
         await UserModel.findById(req.user._id).populate({
            path: 'travels',
            populate: { path: 'users', select: 'nickName avatar' },
         })
      )
   })
)

router.put(
   '/',
   asyncHandler(async (req, res) => {
      const user = { ...req.body }
      user._id = req.user._id
      delete user.contacts
      delete user.travels
      res.json(await UserModel.findByIdAndUpdate(req.user._id, user, { new: true }))
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      // TODO: выпилить selfId после добавления авторизации. Сейчас заведомо сфейлится
      const { selfId } = null
      let deletedUser
      if (!!selfId) {
         deletedUser = await UserModel.findByIdAndRemove(req.user._id)
      }
      //TODO: Удаление пользователя из всех travel, cards, payer
      // либо замена его на dummyUser - по решению общего собрания
      // Либо вообще запретить удаление пользователей. Пусть будут вечными! %)
      res.json(deletedUser)
   })
)

module.exports = router
