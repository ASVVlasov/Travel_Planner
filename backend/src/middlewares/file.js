const AWS = require('aws-sdk')
const fs = require('fs')
const multer = require('multer')
const asyncHandler = require('express-async-handler')
const md5 = require('md5')
const { promisify } = require('util')

const storage = multer.diskStorage({
   destination: 'uploads/',
   filename: function (req, file, cb) {
      cb(null, file.originalname)
   },
})
const upload = multer({ storage })
AWS.config.update({
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region: process.env.AWS_REGION,
})

const s3 = new AWS.S3()

const readFile = promisify(fs.readFile)
const unlinkFile = promisify(fs.unlink)

const genFile = (originalName) => {
   const ext = originalName.split('.').splice(-1, 1)
   const uploadName = `${md5(originalName)}.${ext}`
   return {
      originalName,
      uploadName,
   }
}

const fileMiddleware = {
   uploadFile: [
      upload.single('file'),
      asyncHandler(async function (req, res, next) {
         const fileData = await readFile(req.file.path)
         const file = genFile(req.file.filename)
         const putParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: file.uploadName,
            Body: fileData,
         }
         s3.putObject(putParams, async (err, data) => {
            if (err) {
               next(err)
            } else {
               await unlinkFile(req.file.path)
               req.file = { ...file }
               next()
            }
         })
      }),
   ],
   downloadFile: function (req, res, next) {
      const getParams = {
         Bucket: process.env.S3_BUCKET_NAME,
         Key: req.params.fileName,
      }
      s3.getObject(getParams, function (err, data) {
         if (err) {
            next(err)
         } else {
            req.file = data.Body
            next()
         }
      })
   },
   removeFiles: function (req, res, next) {
      const getParams = {
         Bucket: process.env.S3_BUCKET_NAME,
         Delete: {
            Objects: req.files.map((fileName) => ({ Key: fileName })),
         },
      }
      s3.deleteObjects(getParams, function (err, data) {
         if (err) {
            next(err)
         } else {
            next()
         }
      })
   },
}

module.exports = fileMiddleware
