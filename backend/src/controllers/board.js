const Board = require("../models/board.js");

const create = async (req, res) => {
    const {
        name,
        beginDate,
        endDate,
        travelers
    } = req.body;
    travelers.push(req.body.userID)
    try {
        const newBoard = await Board.create({
            name: name,
            beginDate: beginDate,
            endDate: endDate,
            travelers: [travelers]
        });
        res.json(newBoard._id);
    } catch (err) {
        res.status(500).json({
            status: "Database error: can't create entry",
            error: err,
        });
    }
};

const read = async (req, res) => {
    const id = req.body.baordID;
    if (id === undefined)
        res.status(400).json({
            status: "Request error: empty id",
        });
    try {
        let board = await Board.findById(id);
        res.json(board);
    } catch (err) {
        res.status(500).json({
            status: "Database error: can't read entry / entry doesn't exist",
            error: err,
        });
    }
};

const update = async (req, res) => {
    const id = req.body.boardID;
    if (id === undefined)
        res.status(400).json({
            status: "Request error: empty id",
        });
    if (await Board.findById(id) === null)
        res.status(400).json({
            status: "Request error: wrong id",
        });
    try {
        let updatedFields = {};
        if (req.body.name !== undefined) updatedFields.name = req.body.name;
        if (req.body.beginDate !== undefined)
            updatedFields.beginDate = req.body.beginDate;
        if (req.body.endDate !== undefined) updatedFields.endDate = req.body.endDate;
        if (req.body.status !== undefined)
            updatedFields.status = req.body.status;
        console.log(updatedFields)
        if (Object.keys(updatedFields).length == 0) {
            res.status(400).json({
                status: "nothing to update"
            })
        }
        await Board.updateOne({
            _id: id
        }, {
            $set: updatedFields
        })
        let updatedBoard = await Board.findById(id)
        res.json(updatedBoard)
    } catch (err) {
        res.status(500).json({
            status: "Database error: can't update entry / entry doesn't exist",
            error: err,
        });
    }
}

const destroy = async (req, res) => {
    const id = req.body.boardID;
    if (id === undefined)
        res.status(400).json({
            status: "Request error: empty id",
        });
    let deletedBoard = await Board.findById(id)
    if (deletedBoard === null)
        res.status(400).json({
            status: "Request error: wrong id",
        });
    try {
        await Board.deleteOne({
            _id: id
        })
        res.status(200).json({
            status: `Traveler ${deletedBoard.name} deleted`
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