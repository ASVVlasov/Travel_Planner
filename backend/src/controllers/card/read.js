const Board = require("../../models/board.js")
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const read = async (req) => {
    if (!Request.haveID(req.body.boardID)) {
        return ErrorHandler.emptyField("boardID")
    }
    if (!(await Request.recordExists(req.body.boardID, Board))) {
        return ErrorHandler.wrongField("boardID", req.body.boardID)
    }
    if (!Request.haveType(req.body.cardType)) {
        return ErrorHandler.emptyField("cardType")
    }
    if (!Request.typeExists(req.body.cardType)) {
        return ErrorHandler.wrongField("cardType", req.body.cardType)
    }
    if (!Request.haveID(req.body.cardID)) {
        return ErrorHandler.emptyField("cardID")
    }
    try {
        let board = await Board.findById(req.body.boardID)
        let card = board[req.body.cardType + "Cards"].id(req.body.cardID)
        if (card === null) {
            throw ({
                status: "wrong card"
            })
        }
        return ({
            statusCode: 200,
            result: card
        })
    } catch (err) {
        return ErrorHandler.readError(err)
    }
}

module.exports = read