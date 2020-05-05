const Board = require("../../models/board.js")
const Accomodation = require("../../models/accomodation.js")
const Entertainment = require("../../models/entertainment.js")
const Transport = require("../../models/transport.js")
const Todo = require("../../models/todo.js")

const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const create = async (req) => {
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
    try {
        let board = await Board.findById(boardID)
        let newCard;
        switch (req.body.cardType) {
            case "transport":
                newCard = new Transport(req.body.card)
                break;
            case "entertainment":
                newCard = new Entertainment(req.body.card)
                break;
            case "accomodation":
                newCard = new Accomodation(req.body.card)
                break;
            case "todo":
                newCard = new Todo(req.body.card)
                break;
        }
        board[req.body.cardType + "Cards"].push(newCard);
        await board.save()
        return ({
            statusCode: 200,
            result: newCard
        })
    } catch (err) {
        return ErrorHandler.createError(err)
    }
}

module.exports = create