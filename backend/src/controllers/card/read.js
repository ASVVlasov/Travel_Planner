const Board = require("../../models/board.js");

const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const read = async (req, res) => {
    if (!Request.haveID(req.body.boardID)) {
        ErrorHandler.emptyID(req, res, "board");
        return;
    }
    if (!(await Request.recordExists(req.body.boardID, Board))) {
        ErrorHandler.wrongID(req, res, "board");
        return;
    }
    if (!Request.haveType(req.body.cardType)) {
        ErrorHandler.emptyID(req, res, req.body.cardType);
        return;
    }
    if (!Request.haveID(req.body.cardID)) {
        ErrorHandler.emptyID(req, res, "card");
        return;
    }
    try {
        let board = await Board.findById(boardID)
        let card;
        switch (req.body.cardType) {
            case "transport":
                card = board.transportCards.id(req.body.cardID);
                break;
            case "entertaiment":
                card = board.entertaimentCards.id(req.body.cardID);
                break;
            case "accomodation":
                card = board.accomodationCards.id(req.body.cardID);
                break;
            case "todo":
                card = board.todoCards.id(req.body.cardID);
                break;
        }
        if (card === null) throw (err)
        res.json(card);
    } catch (err) {
        ErrorHandler.readError(req, res, err)
    }
};

module.exports = read;