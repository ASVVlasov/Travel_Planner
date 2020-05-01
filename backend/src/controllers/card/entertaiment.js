const Entertaiment = require("../../models/entertaiment.js");
const Board = require("../../models/board.js")

const create = async (req, res) => {
    let {
        boardID,
        payer,
        cost,
        type,
        name,
        company,
        place,
        beginDate,
        endDate,
        comment
    } = req.body;
    let travelers = req.body.travelers
    if (travelers !== undefined) travelers.push(req.body.travelerID)
    else travelers = [req.body.travelerID];
    try {
        let newEntertaiment = new Entertaiment({
            payer: payer,
            cost: cost,
            type: type,
            name: name,
            company: company,
            place: place,
            beginDate: beginDate,
            endDate: endDate,
            comment: comment,
            travelers: travelers
        });
        let board = await Board.findById(boardID)
        if (board === null) res.status(400).json({
            status: "Request error: wrong boardID"
        })
        board.entertaimentCards.push(newEntertaiment);
        await board.save()
        res.json(newEntertaiment);
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
        let entertaiment = board.entertaimentCards.id(id);
        if (entertaiment === null) throw (err)
        res.json(entertaiment);
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
        let entertaiment = board.entertaimentCards.id(id);
        if (entertaiment === null) throw (err)
        if (req.body.payer !== undefined) entertaiment.payer = req.body.payer;
        if (req.body.cost !== undefined) entertaiment.cost = req.body.cost;
        if (req.body.type !== undefined) entertaiment.type = req.body.type;
        if (req.body.name !== undefined) entertaiment.name = req.body.name;
        if (req.body.company !== undefined) entertaiment.company = req.body.company;
        if (req.body.place !== undefined) entertaiment.place = req.body.place;
        if (req.body.beginDate !== undefined) entertaiment.beginDate = req.body.beginDate;
        if (req.body.endDate !== undefined) entertaiment.endDate = req.body.endDate;
        if (req.body.comment !== undefined) entertaiment.comment = req.body.comment;
        if (req.body.travelers !== undefined &&
            req.body.travelers.length !== 0) entertaiment.travelers = req.body.travelers;
        await board.save()
        updatedEntertaiment = board.entertaimentCards.id(id);
        res.json(updatedEntertaiment)
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
        let deletedEntertaiment = board.entertaimentCards.id(id);
        await board.entertaimentCards.id(id).remove();
        await board.save();
        res.status(200).json({
            status: `EntertaimentCard ${deletedEntertaiment.name} deleted`
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