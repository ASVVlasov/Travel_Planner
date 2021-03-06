const AWS = require('aws-sdk')
const fs = require('fs')
const { promisify } = require('util')
const Errors = require('../types/errors')

AWS.config.update({
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region: process.env.AWS_REGION,
})

const s3 = new AWS.S3()

const readFile = promisify(fs.readFile)
const unlinkFile = promisify(fs.unlink)
const genFileName = function (file) {
   const ext = file.fileName.split('.').splice(-1, 1)
   return `${file.id}.${ext}`
}
const fileHandler = {
   uploadFile: async function (file) {
      const fileData = await readFile(file.path)
      const putParams = {
         Bucket: process.env.S3_BUCKET_NAME,
         Key: genFileName(file.fileModel),
         Body: fileData,
      }
      return new Promise((resolve, reject) => {
         s3.putObject(putParams, async (err, data) => {
            if (err) {
               throw Errors.fileError.addFileError
            } else {
               await unlinkFile(file.path)
               resolve(true)
            }
         })
      })
   },
   downloadFile: function (file) {
      const getParams = {
         Bucket: process.env.S3_BUCKET_NAME,
         Key: genFileName(file),
         ResponseContentDisposition: `attachment; filename ="${encodeURIComponent(file.fileName)}"`,
      }
      return new Promise((resolve, reject) => {
         s3.getObject(getParams, function (err, data) {
            if (err) {
               throw Errors.fileError.getFileError
            } else {
               resolve(data)
            }
         })
      })
   },
   deleteFile: function (file) {
      const getParams = {
         Bucket: process.env.S3_BUCKET_NAME,
         Key: genFileName(file),
      }
      return new Promise((resolve, reject) => {
         s3.deleteObject(getParams, function (err, data) {
            if (err) {
               throw Errors.fileError.deleteFileError
            } else {
               resolve(true)
            }
         })
      })
   },
}

module.exports = fileHandler
