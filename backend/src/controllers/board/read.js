const Board = require("../../models/board.js");
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const read = async (req, res) => {
    if (!Request.haveID(req.body.boardID)) {
        ErrorHandler.emptyID(req, res, "board");
        return;
    }
    if (!Request.recordExists(req.body.boardID, Board)) {
        ErrorHandler.wrongID(req, res, "traveler");
        return;
    }
    try {
        let board = await Board.findById(req.body.boardID);
        if (board === null) throw (err)
        res.json(board);
    } catch (err) {
        ErrorHandler.readError(req, res, err)
    }
};

module.exports = read;