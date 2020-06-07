const router = require('express').Router()
const CardModel = require('../../models/card.js')
const FileModel = require('../../models/file.js')
const fileMiddleware = require('../../middlewares/file.js')
const asyncHandler = require('express-async-handler')

router.post(
   '/',
   fileMiddleware,
   asyncHandler(async (req, res) => {
      const { cardId } = req.body
      let files = await FileModel.createFiles(req.files)
      let update = { $push: { files: { $each: files } } }
      res.json(await CardModel.findByIdAndUpdate(cardId, update, { new: true }))
   })
)
router.get(
   '/:fileId',
   asyncHandler(async (req, res) => {
      const { fileId } = req.params
      let file = await FileModel.getFile(fileId)
      res.setHeader('Content-Disposition', file.ContentDisposition)
      res.send(file.Body)
   })
)
router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const { cardId, fileId } = req.body
      await FileModel.deleteFiles([fileId])
      let update = { $pull: { files: fileId } }
      res.json(await CardModel.findByIdAndUpdate(cardId, update, { new: true }))
   })
)

module.exports = router
