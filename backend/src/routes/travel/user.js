const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const TravelModel = require('../../models/travel')
const UserModel = require('../../models/user')
const createError = require('http-errors')

router.post(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      const travel = await TravelModel.findById(travelId)
      if (travel.users.find((u) => u.id === userId) || !userId) {
         throw createError(
            400,
            'Такой участник здесь уже есть. Возможно кто-то добавил его до вас... или у нас двоится 👀 Обновите страницу, чтобы проверить.'
         )
      }
      await UserModel.findByIdAndUpdate(userId, { $push: { travels: travelId } })
      const update = { $push: { users: userId } }
      res.json(await TravelModel.findByIdAndUpdate(travelId, update, { new: true }))
   })
)

router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const { travelId, userId } = req.body
      await UserModel.findByIdAndUpdate(userId, { $pull: { travels: travelId } })
      const update = { $pull: { users: userId } }
      res.json(await TravelModel.findByIdAndUpdate(travelId, update, { new: true }))
   })
)

module.exports = router
