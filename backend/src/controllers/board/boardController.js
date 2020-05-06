const Board = require('../../models/board.js')
const ErrorHandler = require('../errorHandler.js')
const Request = require('../requestCheck')

class BoardController {
   static async create(boardSchema) {
      try {
         return await Board.create(boardSchema)
      } catch (err) {
         return ErrorHandler.createError(err)
      }
   }
   static async read(boardID) {
      try {
         if (!Request.haveID(boardID)) {
            ErrorHandler.emptyField('boardID')
            return
         }
         if (!(await Request.recordExists(boardID, Board))) {
            ErrorHandler.wrongField('boardID', boardID)
            return
         }
         let board = await Board.findById(boardID)
         if (board === null) {
            throw {
               status: 'wrong board',
            }
         }
         return board
      } catch (err) {
         return ErrorHandler.readError(err)
      }
   }
   static async delete(boardID) {
      try {
         if (!Request.haveID(boardID)) {
            ErrorHandler.emptyField('boardID')
            return
         }
         if (!(await Request.recordExists(boardID, Board))) {
            ErrorHandler.wrongField('boardID', boardID)
            return
         }
         let deletedBoard = await Board.findById(boardID)
         await Board.deleteOne({
            _id: boardID,
         })
         return {
            status: `Traveler ${deletedBoard.login} deleted`,
         }
      } catch (err) {
         return ErrorHandler.deleteError(err)
      }
   }
   static async update(boardSchema) {
      try {
         if (!Request.haveID(boardSchema.boardID)) {
            return ErrorHandler.emptyField('boardID')
         }
         if (!(await Request.recordExists(boardSchema.boardID, Board))) {
            return ErrorHandler.wrongField('boardID', boardSchema.boardID)
         }
         if (!Request.canUpdate(boardSchema)) {
            return ErrorHandler.emptyUpdate('board')
         }
         await Board.updateOne(
            {
               _id: boardSchema.boardID,
            },
            {
               $set: boardSchema,
            }
         )
         return await Board.findById(boardSchema.boardID)
      } catch (err) {
         return ErrorHandler.updateError(err)
      }
   }
}

module.exports = BoardController
