const Accomodation = require("../models/accomodation.js");
const Board = require("../models/board.js")

const create = async (req, res) => {
    let {
        boardID,
        payer,
        cost,
        type,
        name,
        company,
        checkIn,
        checkOut,
        comment
    } = req.body;
    let travelers = req.body.travelers
    if (travelers !== undefined) travelers.push(req.body.travelerID)
    else travelers = [req.body.travelerID];
    try {
        let newAccomodation = new Accomodation({
            payer: payer,
            cost: cost,
            type: type,
            name: name,
            company: company,
            checkIn: checkIn,
            checkOut: checkOut,
            comment: comment,
            travelers: travelers
        });
        let board = await Board.findById(boardID)
        if (board === null) res.status(400).json({
            status: "Request error: wrong boardID"
        })
        board.accomodationCards.push(newAccomodation);
        await board.save()
        res.json(newAccomodation);
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
        let accomodation = board.accomodationCards.id(id);
        if (accomodation === null) throw (err)
        res.json(accomodation);
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
        let accomodation = board.accomodationCards.id(id);
        if (accomodation === null) throw (err)
        if (req.body.payer !== undefined) accomodation.payer = req.body.payer;
        if (req.body.cost !== undefined) accomodation.cost = req.body.cost;
        if (req.body.type !== undefined) accomodation.type = req.body.type;
        if (req.body.name !== undefined) accomodation.name = req.body.name;
        if (req.body.company !== undefined) accomodation.company = req.body.company;
        if (req.body.checkIn !== undefined) accomodation.checkIn = req.body.checkIn;
        if (req.body.checkOut !== undefined) accomodation.checkOut = req.body.checkOut;
        if (req.body.comment !== undefined) accomodation.comment = req.body.comment;
        await board.save()
        updatedAccomodation = board.accomodationCards.id(id);
        res.json(updatedAccomodation)
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
        let deletedAccomodation = board.accomodationCards.id(id);
        await board.accomodationCards.id(id).remove();
        await board.save();
        res.status(200).json({
            status: `AccomodationCard ${deletedAccomodation.name} deleted`
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