const router = require('express').Router()
const UserModel = require('../../models/user.js')
const FileModel = require('../../models/file.js')
const fileMiddleware = require('../../middlewares/file.js')
const asyncHandler = require('express-async-handler')

router.post(
   '/',
   fileMiddleware,
   asyncHandler(async (req, res) => {
      let [file] = await FileModel.createFiles(req.files)
      let update = { avatar: file }
      res.json(await UserModel.findByIdAndUpdate(req.user._id, update, { new: true }))
   })
)
router.get(
   '/:fileId',
   asyncHandler(async (req, res) => {
      const { fileId } = req.params
      res.send(await FileModel.getFile(fileId))
   })
)
router.delete(
   '/',
   asyncHandler(async (req, res) => {
      const fileId = (await UserModel.findById(req.user._id)).avatar
      await FileModel.deleteFiles([fileId])
      let update = { avatar: '' }
      res.json(await CardModel.findByIdAndUpdate(req.user._id, update, { new: true }))
   })
)

module.exports = router
