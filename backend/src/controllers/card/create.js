const Board = require("../../models/board.js");
const Accomodation = require("../../models/accomodation.js");
const Entertaiment = require("../../models/entertaiment.js");
const Transport = require("../../models/transport.js");
const Todo = require("../../models/todo.js");

const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const create = async (req, res) => {
    if (!Request.haveID(req.body.boardID)) {
        ErrorHandler.emptyField(req, res, "boardID");
        return;
    }
    if (!(await Request.recordExists(req.body.boardID, Board))) {
        ErrorHandler.wrongID(req, res, "board");
        return;
    }
    if (!Request.haveType(req.body.cardType)) {
        ErrorHandler.emptyField(req, res, "cardType");
        return;
    }
    if (!Request.typeExists(req.body.cardType)) {
        ErrorHandler.wrongType(req, res, req.body.cardType)
    }
    try {
        let board = await Board.findById(boardID)
        let newCard;
        switch (req.body.cardType) {
            case "transport":
                newCard = new Transport(req.body.card)
                break;
            case "entertaiment":
                newCard = new Entertaiment(req.body.card)
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
        res.json(newCard);
    } catch (err) {
        ErrorHandler.createError(req, res, err)
    }
};

module.exports = create;