const Board = require("../../models/board.js");
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const destroy = async (req, res) => {
    if (!Request.haveID(req.body.boardID)) {
        ErrorHandler.emptyField(req, res, "boardID");
        return;
    }
    if (!(await Request.recordExists(req.body.boardID, Board))) {
        ErrorHandler.wrongID(req, res, "traveler");
        return;
    }
    try {
        let deletedBoard = await Board.findById(req.body.boardID)
        await Board.deleteOne({
            _id: req.body.boardID
        })
        res.status(200).json({
            status: `Traveler ${deletedBoard.login} deleted`
        })
    } catch (err) {
        ErrorHandler.deleteError(req, res, err)
    }
};

module.exports = destroy;