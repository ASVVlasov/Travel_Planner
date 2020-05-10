const path = require('path')
const FileModel = require('../../models/file')

class FileController {
   static async getFileById(fileId) {
      return await FileModel.findById(fileId).lean()
   }
   static async deleteFileById(fileId) {
      return await FileModel.findByIdAndDelete(fileId)
   }
   static _generateExt(filename) {
      const splitFile = filename.split('.')
      return splitFile[splitFile.length - 1]
   }
   static async getFiles(fileIds) {
      if (!fileIds) {
         return []
      }
      const files = []
      for (const fileId of fileIds) {
         files.push(await this.getFileById(fileId))
      }
      return files
   }
   static async uploadFile(file) {
      const generatedFileName = `${file.md5}.${this._generateExt(file.name)}`
      await file.mv(path.resolve(__dirname, '..', '..', 'uploads', generatedFileName))
      const newFile = new FileModel({
         originalName: file.name,
         uploadName: generatedFileName,
      })
      await newFile.save()
      return JSON.parse(JSON.stringify(newFile))
   }
}

module.exports = FileController
