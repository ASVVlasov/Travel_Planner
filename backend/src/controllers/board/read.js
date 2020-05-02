const Board = require("../../models/board.js");
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const read = async (req, res) => {
    if (!Request.haveID(req.body.boardID)) {
        ErrorHandler.emptyField(req, res, "boardID");
        return;
    }
    if (!(await Request.recordExists(req.body.boardID, Board))) {
        ErrorHandler.wrongField(req, res, "boardID", req.body.boardID);
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