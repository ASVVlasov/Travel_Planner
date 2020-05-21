const router = require('express').Router()
const UserModel = require('../../models/user')
const asyncHandler = require('express-async-handler')
const contactRouter = require('./contact')
const mock = require('../mock-id')

router.use('/contact', contactRouter)

router.post(
   '/',
   asyncHandler(async (req, res) => {
      // TODO: заменить после авторизации
      let newUser = await UserModel.create(req.body)
      res.json(newUser)
   })
)

router.get(
   '/:userId',
   asyncHandler(async (req, res) => {
      const { userId } = req.params
      res.json(await UserModel.findById(userId))
   })
)
router.get(
   '/',
   asyncHandler(async (req, res) => {
      // TODO: выпилить selfId после добавления авторизации
      const selfId = mock.USERID
      res.json(await UserModel.findById(selfId))
   })
)

router.put(
   '/',
   asyncHandler(async (req, res) => {
      // Потенциальная уязвимость в части изменения другого пользователя злоумышленником
      // Допилить после введения авторизации
      const user = { ...req.body }
      delete user.contacts
      delete user.travels
      res.json(await UserModel.findByIdAndUpdate(user._id, user, { new: true }))
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      // TODO: выпилить selfId после добавления авторизации
      const { selfId } = req.body
      let deletedUser
      if (!!selfId) {
         deletedUser = await UserModel.findByIdAndRemove(selfId)
      }
      //TODO: Удаление пользователя из всех travel, cards, payer
      // либо замена его на dummyUser - по решению общего собрания
      // Либо вообще запретить удаление пользователей. Пусть будут вечными! %)
      res.json(deletedUser)
   })
)

module.exports = router