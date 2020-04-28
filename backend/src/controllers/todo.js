const Todo = require("../models/todo.js");
const Board = require("../models/board.js")

const create = async (req, res) => {
    let {
        boardID,
        isDone,
        header,
        details,
        todoDate
    } = req.body;
    let travelers = req.body.travelers
    if (travelers !== undefined) travelers.push(req.body.travelerID)
    else travelers = [req.body.travelerID];
    try {
        let newTodo = new Todo({
            isDone: isDone,
            header: header,
            details: details,
            todoDate: todoDate,
            travelers: travelers
        });
        let board = await Board.findById(boardID)
        if (board === null) res.status(400).json({
            status: "Request error: wrong boardID"
        })
        board.todoCards.push(newTodo);
        await board.save()
        res.json(newTodo);
    } catch (err) {
        res.status(500).json({
            status: "Database error: can't create entry",
            error: err,
        });
    }
};

const read = async (req, res) => {
    const id = req.body.cardID;
    const boardID = req.body.boardID;
    if (id === undefined) {
        res.status(400).json({
            status: "Request error: empty cardID",
        });
        return
    }
    if (boardID === undefined) {
        res.status(400).json({
            status: "Request error: empty boardID",
        });
        return
    }
    let board = await Board.findById(boardID)
    if (board === null) {
        res.status(400).json({
            status: "Request error: wrong boardID"
        })
        return
    }
    try {
        let todo = board.todoCards.id(id);
        if (todo === null) throw (err)
        res.json(todo);
    } catch (err) {
        res.status(500).json({
            status: "Database error: can't read entry / entry doesn't exist",
            error: err,
        });
    }
};

const update = async (req, res) => {
    const id = req.body.cardID;
    const boardID = req.body.boardID;
    if (id === undefined) {
        res.status(400).json({
            status: "Request error: empty cardID",
        });
        return
    }
    if (boardID === undefined) {
        res.status(400).json({
            status: "Request error: empty boardID",
        });
        return
    }
    let board = await Board.findById(boardID)
    if (board === null) {
        res.status(400).json({
            status: "Request error: wrong boardID"
        })
        return
    }
    try {
        let todo = board.todoCards.id(id);
        if (todo === null) throw (err)
        if (req.body.header !== undefined) todo.header = req.body.header;
        if (req.body.details !== undefined) todo.cost = req.body.details;
        if (req.body.isDone !== undefined) todo.isDone = req.body.isDone;
        if (req.body.todoDate !== undefined) todo.todoDate = req.body.todoDate;
        if (req.body.travelers !== undefined &&
            req.body.travelers.length !== 0) todo.travelers = req.body.travelers;
        await board.save()
        updatedTodo = board.todoCards.id(id);
        res.json(updatedTodo)
    } catch (err) {
        res.status(500).json({
            status: "Database error: can't update entry / entry doesn't exist",
            error: err,
        });
    }
}

const destroy = async (req, res) => {
    const id = req.body.cardID;
    const boardID = req.body.boardID;
    if (id === undefined) {
        res.status(400).json({
            status: "Request error: empty cardID",
        });
        return
    }
    if (boardID === undefined) {
        res.status(400).json({
            status: "Request error: empty boardID",
        });
        return
    }
    let board = await Board.findById(boardID)
    if (board === null) {
        res.status(400).json({
            status: "Request error: wrong boardID"
        })
        return
    }
    try {
        let deletedTodo = board.todoCards.id(id);
        await board.todoCards.id(id).remove();
        await board.save();
        res.status(200).json({
            status: `todoCard ${deletedTodo.header} deleted`
        })
    } catch (err) {
        res.status(500).json({
            status: "Database error: can't delete entry / entry doesn't exist",
            error: err,
        });
    }
};

module.exports = {
    create,
    read,
    update,
    destroy
};