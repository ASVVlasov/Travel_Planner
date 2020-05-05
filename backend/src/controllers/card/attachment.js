const Attachment = require('../../models/misc/attachment.js')
const Board = require('../../models/board.js')

const ErrorHandler = require('../errorHandler.js')
const Request = require('../requestCheck.js')
const path = require('path')
const fs = require('fs')

const getExt = (filename) => {
   const splitFile = filename.split('.')
   return splitFile[splitFile.length - 1]
}

function attachFile(req) {
   if (req.files) {
      const uploadFile = req.files.file
      const generatedFileName = `${uploadFile.md5}.${getExt(uploadFile.name)}`
      uploadFile.mv(path.resolve(__dirname, '..', '..', 'uploads', generatedFileName))
      return {
         name: uploadFile.name,
         path: generatedFileName,
      }
   } else {
      return null
   }
}

function deattachFile(fileName) {
   return new Promise((resolve, reject) => {
      fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', fileName), (err) => {
         if (err) {
            resolve(false)
         }
         resolve(true)
      })
   })
}

const attach = async (req) => {
   try {
      if (!Request.haveID(req.body.boardID)) {
         return ErrorHandler.emptyField('boardID')
      }
      if (!(await Request.recordExists(req.body.boardID, Board))) {
         return ErrorHandler.wrongField('boardID', req.body.boardID)
      }
      if (!Request.haveType(req.body.cardType)) {
         return ErrorHandler.emptyField('cardType')
      }
      if (!Request.typeExists(req.body.cardType)) {
         return ErrorHandler.wrongField('cardType', req.body.cardType)
      }
      if (!Request.haveID(req.body.cardID)) {
         return ErrorHandler.emptyField('cardID')
      }
      if (!Request.haveFileName(req.body.attachment.name)) {
         return ErrorHandler.emptyField(req, res, 'file name')
      }
      let path = attachFile(req)
      if (!path) {
         return ErrorHandler.fileUploadError(req, res)
      }
      let board = await Board.findById(req.body.boardID)
      let newAttachment = new Attachment({
         name: req.body.attachment.name,
         path: path,
      })
      let card = board[req.body.cardType + 'Cards'].id(req.body.cardID)
      if (card === null) {
         throw {
            status: 'wrong card',
         }
      }
      card.attachments.push(newAttachment)
      await board.save()
      return {
         statusCode: 200,
         result: newAttachment,
      }
   } catch (err) {
      return {
         statusCode: 500,
         result: err,
      }
   }
}

const deattach = async (req) => {
   try {
      if (!Request.haveID(req.body.boardID)) {
         return ErrorHandler.emptyField('boardID')
      }
      if (!(await Request.recordExists(req.body.boardID, Board))) {
         return ErrorHandler.wrongField('boardID', req.body.boardID)
      }
      if (!Request.haveType(req.body.cardType)) {
         return ErrorHandler.emptyField('cardType')
      }
      if (!Request.typeExists(req.body.cardType)) {
         return ErrorHandler.wrongField('cardType', req.body.cardType)
      }
      if (!Request.haveID(req.body.cardID)) {
         return ErrorHandler.emptyField('cardID')
         return
      }
      if (!Request.haveFileName(req.body.attachment.name)) {
         return ErrorHandler.emptyField('file name')
      }
      let board = await Board.findById(req.body.boardID)
      let card = board[req.body.cardType + 'Cards'].id(req.body.cardID)
      if (card === null) {
         throw {
            status: 'wrong card',
         }
      }
      let deletedAttachment = card.attachments.id(req.body.attachmentID)
      if (!deattachFile(deletedAttachment.path)) throw deletedAttachment.path
      card.attachments.id(req.body.attachmentID).remove()
      await board.save()
      return {
         statusCode: 200,
         result: deletedAttachment,
      }
   } catch (err) {
      return ErrorHandler.fileDeleteError(err)
   }
}
module.exports = {
   attach,
   deattach,
}
