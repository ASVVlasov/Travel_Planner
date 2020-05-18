const mongoose = require('mongoose')
const Schema = mongoose.Schema
const fileHandler = require('./handlers/fileHandler')
const createError = require('http-errors')

const fileSchema = new Schema({
   fileName: {
      type: String,
      description: 'Оригинальное имя файла(с расширением)',
   },
})

fileSchema.statics.createFiles = async function (files) {
   const fileModels = []
   for (const file of files) {
      const newFile = await this.create({ fileName: file.filename })
      await fileHandler.uploadFile({ ...file, fileModel: newFile })
      fileModels.push(newFile)
   }
   return fileModels
}

fileSchema.statics.deleteFiles = async function (fileIds) {
   for (const fileId of fileIds) {
      await this.findOneAndRemove({ _id: fileId })
   }
}

fileSchema.statics.getFile = async function (fileId) {
   const file = await this.findById(fileId)
   return fileHandler.downloadFile(file)
}

fileSchema.post('findOneAndRemove', async function (doc, next) {
   await fileHandler.deleteFile(doc)
   next()
})

module.exports = mongoose.model('File', fileSchema)
