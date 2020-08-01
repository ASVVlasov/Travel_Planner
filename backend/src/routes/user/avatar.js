const router = require('express').Router()
const UserModel = require('../../models/user.js')
const FileModel = require('../../models/file.js')
const fileMiddleware = require('../../middlewares/file.js')
const asyncHandler = require('express-async-handler')

router.post(
   '/',
   fileMiddleware,
   asyncHandler(async (req, res, next) => {
      let [file] = await FileModel.createFiles(req.files)
      let update = { avatar: file }
      req.data = await UserModel.findByIdAndUpdate(req.user._id, update, { new: true })
      next()
   })
)
router.get(
   '/:fileId',
   asyncHandler(async (req, res, next) => {
      const { fileId } = req.params
      res.send((await FileModel.getFile(fileId)).Body)
   })
)
router.delete(
   '/',
   asyncHandler(async (req, res, next) => {
      const fileId = (await UserModel.findById(req.user._id)).avatar
      await FileModel.deleteFiles([fileId])
      let update = { avatar: null }
      req.data = await UserModel.findByIdAndUpdate(req.user._id, update, { new: true })
      next()
   })
)

module.exports = router
