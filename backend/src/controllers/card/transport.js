const Transport = require("../models/transport.js");
const Board = require("../models/board.js")

const create = async (req, res) => {
    let {
        boardID,
        payer,
        cost,
        transport,
        company,
        departurePlace,
        departureDate,
        arrivalPlace,
        arrivalDate,
        comment
    } = req.body;
    let travelers = req.body.travelers
    if (travelers !== undefined) travelers.push(req.body.travelerID)
    else travelers = [req.body.travelerID];
    try {
        let newTransport = new Transport({
            payer: payer,
            cost: cost,
            transport: transport,
            company: company,
            departurePlace: departurePlace,
            departureDate: departureDate,
            arrivalPlace: arrivalPlace,
            arrivalDate: arrivalDate,
            comment: comment,
            travelers: travelers
        });
        let board = await Board.findById(boardID)
        if (board === null) res.status(400).json({
            status: "Request error: wrong boardID"
        })
        board.transportCards.push(newTransport);
        await board.save()
        res.json(newTransport);
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
        let transport = board.transportCards.id(id);
        if (transport === null) throw (err)
        res.json(transport);
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
        let transport = board.transportCards.id(id);
        if (transport === null) throw (err)
        if (req.body.payer !== undefined) transport.payer = req.body.payer;
        if (req.body.cost !== undefined) transport.cost = req.body.cost;
        if (req.body.transport !== undefined) transport.transport = req.body.transport;
        if (req.body.company !== undefined) transport.company = req.body.company;
        if (req.body.departurePlace !== undefined) transport.departurePlace = req.body.departurePlace;
        if (req.body.departureDate !== undefined) transport.departureDate = req.body.departureDate;
        if (req.body.arrivalPlace !== undefined) transport.arrivalPlace = req.body.arrivalPlace;
        if (req.body.arrivalDate !== undefined) transport.arrivalDate = req.body.arrivalDate;
        if (req.body.comment !== undefined) transport.comment = req.body.comment;
        if (req.body.travelers !== undefined &&
            req.body.travelers.length !== 0) transport.travelers = req.body.travelers;
        await board.save()
        updatedTransport = board.transportCards.id(id);
        res.json(updatedTransport)
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
        let deletedTransport = board.transportCards.id(id);
        await board.transportCards.id(id).remove();
        await board.save();
        res.status(200).json({
            status: `TransportCard ${deletedTransport.transport} deleted`
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