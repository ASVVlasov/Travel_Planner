const router = require('express').Router()
const CardModel = require('../models/card.js')
const FileModel = require('../models/file.js')
const fileMiddleware = require('../middlewares/file.js')
const asyncHandler = require('express-async-handler')
/*HARDCODE*/
const TRAVELID = '5eb9a8ae468c2a28eb4220f0'

router.post(
   '/uploadFile',
   fileMiddleware.uploadFile,
   asyncHandler(async (req, res) => {
      const { cardId } = req.body.cardId
      let file = await FileModel.create(req.file)
      res.json(await CardModel.addFile(cardId, file))
   })
)
router.put(
   '/deleteFile',
   asyncHandler(async (req, res) => {
      const { cardId, fileId } = req.body
      res.json(await CardModel.removeFile(cardId, fileId))
   })
)
router.put(
   '/addUser',
   asyncHandler(async (req, res) => {
      const { cardId, userId } = req.body
      res.json(await CardModel.addUser(cardId, userId))
   })
)
router.put(
   '/removeUser',
   asyncHandler(async (req, res) => {
      const { cardId, userId } = req.body
      res.json(await CardModel.removeUser(cardId, userId))
   })
)
router.post(
   '/',
   asyncHandler(async (req, res) => {
      req.body.travelId = TRAVELID
      res.json(await CardModel.create(req.body))
   })
)
router.get(
   '/:cardId/',
   asyncHandler(async (req, res) => {
      const { cardId } = req.params
      res.json(await CardModel.findById(cardId))
   })
)
router.put(
   '/',
   asyncHandler(async (req, res) => {
      const cardId = req.body._id
      const { card } = req.body
      delete card.users
      delete card.files
      delete card.payers
      res.json(await CardModel.findByIdAndUpdate(cardId, card, { new: true }))
   })
)
router.delete(
   '/:cardId',
   asyncHandler(async (req, res) => {
      const { cardId } = req.params
      res.json(await CardModel.findByIdAndDelete(cardId))
   })
)

module.exports = router
