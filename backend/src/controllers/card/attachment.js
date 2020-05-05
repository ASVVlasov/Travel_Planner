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

const attach = async (req, res) => {
   if (!Request.haveID(req.body.boardID)) {
      ErrorHandler.emptyField(req, res, 'boardID')
      return
   }
   if (!(await Request.recordExists(req.body.boardID, Board))) {
      ErrorHandler.wrongField(req, res, 'boardID', req.body.boardID)
      return
   }
   if (!Request.haveType(req.body.cardType)) {
      ErrorHandler.emptyField(req, res, 'cardType')
      return
   }
   if (!Request.typeExists(req.body.cardType)) {
      ErrorHandler.wrongField(req, res, 'cardType', req.body.cardType)
   }
   if (!Request.haveID(req.body.cardID)) {
      ErrorHandler.emptyField(req, res, 'cardID')
      return
   }
   if (!Request.haveFileName(req.body.attachment.name)) {
      ErrorHandler.emptyField(req, res, 'file name')
      return
   }
   let attachment = attachFile(req)
   if (!attachment) {
      ErrorHandler.fileUploadError(req, res)
      return
   }
   try {
      let board = await Board.findById(req.body.boardID)
      let newAttachment = new Attachment(attachment)
      let card = board[req.body.cardType + 'Cards'].id(req.body.cardID)
      if (card === null) {
         throw {
            status: 'wrong card',
         }
      }
      card.attachments.push(newAttachment)
      await board.save()
      res.status(200).json(newAttachment)
   } catch (err) {
      res.status(500).json(err)
   }
}

const deattach = async (req, res) => {
   if (!Request.haveID(req.body.boardID)) {
      ErrorHandler.emptyField(req, res, 'boardID')
      return
   }
   if (!(await Request.recordExists(req.body.boardID, Board))) {
      ErrorHandler.wrongField(req, res, 'boardID', req.body.boardID)
      return
   }
   if (!Request.haveType(req.body.cardType)) {
      ErrorHandler.emptyField(req, res, 'cardType')
      return
   }
   if (!Request.typeExists(req.body.cardType)) {
      ErrorHandler.wrongField(req, res, 'cardType', req.body.cardType)
   }
   if (!Request.haveID(req.body.cardID)) {
      ErrorHandler.emptyField(req, res, 'cardID')
      return
   }
   if (!Request.haveFileName(req.body.attachment.name)) {
      ErrorHandler.emptyField(req, res, 'file name')
      return
   }
   try {
      let board = await Board.findById(req.body.boardID)
      let card = board[req.body.cardType + 'Cards'].id(req.body.cardID)
      if (card === null) {
         throw {
            status: 'wrong card',
         }
      }
      let deletedAttachment = card.attachments.id(req.body.attachmentID)
      deattachFile(deletedAttachment.path).then((res) => {
         if (!res) {
            throw deletedAttachment.path
         }
      })
      card.attachments.id(req.body.attachmentID).remove()
      await board.save()
      res.status(200).json(deletedAttachment)
   } catch (err) {
      ErrorHandler.fileDeleteError(req, res, err)
   }
}
module.exports = {
   attach,
   deattach,
}
