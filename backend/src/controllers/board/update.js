const Board = require("../../models/board.js");
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const update = async (req, res) => {
    if (!Request.haveID(req.body.boardID)) {
        ErrorHandler.emptyField(req, res, "boardID");
        return;
    }
    if (!(await Request.recordExists(req.body.boardID, Board))) {
        ErrorHandler.wrongField(req, res, "boardID", req.body.boardID);
        return;
    }
    if (!Request.canUpdate(req.body.board)) {
        ErrorHandler.emptyUpdate(req, res, "board");
        return;
    }
    try {
        await Board.updateOne({
            _id: req.body.boardID
        }, {
            $set: req.body.board
        })
        let updatedBoard = await Board.findById(req.body.boardID)
        res.json(updatedBoard)
    } catch (err) {
        ErrorHandler.updateError(req, res, err)
    }
}

module.exports = update;