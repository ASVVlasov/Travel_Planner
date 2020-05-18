const router = require('express').Router()
const CardModel = require('../../models/card.js')
const FileModel = require('../../models/file.js')
const fileMiddleware = require('../../middlewares/file.js')
const asyncHandler = require('express-async-handler')

router.post(
   '/',
   fileMiddleware.uploadFile,
   asyncHandler(async (req, res) => {
      const { cardId } = req.body
      let file = await FileModel.create(req.file)
      let update = { $push: { files: file } }
      res.json(await CardModel.findByIdAndUpdate(cardId, update, New))
   })
)
router.get(
   '/:fileName',
   fileMiddleware.downloadFile,
   asyncHandler(async (req, res) => {
      res.send(req.file)
   })
)
router.delete(
   '/',
   asyncHandler(async (req, res, next) => {
      const { fileId } = req.body
      req.files = []
      req.files.push((await FileModel.findById(fileId)).uploadName)
      next()
   }),
   fileMiddleware.removeFiles,
   asyncHandler(async (req, res) => {
      const { cardId, fileId } = req.body
      let update = { $pull: { files: fileId } }
      res.json(await CardModel.findByIdAndUpdate(cardId, update, New))
   })
)

module.exports = router
