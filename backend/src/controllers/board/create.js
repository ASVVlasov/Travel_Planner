const Board = require("../../models/board.js");
const ErrorHandler = require("../errorHandler.js")

const create = async (req, res) => {
    try {
        const newBoard = await Board.create(req.body.board);
        res.json(newBoard);
    } catch (err) {
        ErrorHandler.createError(req, res, err)
    }
};

module.exports = create;