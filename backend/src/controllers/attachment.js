const Attachment = require("../models/misc/attachment.js");
const Board = require("../models/board.js")

function attachFile(req) {
    //TODO выкладка файл на сервер
    return "path on server or null"
}

function deattachFile(path) {
    // TODO функция удаления файла на сервере
    return true
}

const attach = async (req, res) => {
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
    let name = req.body.name;
    if (name === undefined) {
        res.status(400).json({
            status: "Request error: empty file name",
        });
        return
    }
    let path = attachFile(req);
    if (path === null) {
        res.status(500).json({
            status: "Server error: can't upload file"
        });
        return;
    }
    let newAttachment = new Attachment({
        name: name,
        path: path
    })
    let card = await board.accomodationCards.id(id) || board.entertaimentCards.id(id) || board.transportCards.id(id) || board.todoCards.id(id)
    card.attachments.push(newAttachment)
    await board.save()
    console.log(card)
    res.status(200).json(newAttachment);
};

const deattach = async (req, res) => {
    const id = req.body.cardID;
    const boardID = req.body.boardID;
    const attachmentID = req.body.attachmentID;
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
    if (attachmentID === undefined) {
        res.status(400).json({
            status: "Request error: empty attachmentID",
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
    let card = await board.accomodationCards.id(id) || board.entertaimentCards.id(id) || board.transportCards.id(id) || board.todoCards.id(id)
    let deletedAttachment = card.attachments.id(attachmentID)
    if (!deattachFile(deletedAttachment.path)) {
        res.status(500).json({
            status: "Server error: can't upload file"
        });
        return;
    }
    card.attachments.id(attachmentID).remove();
    await board.save()
    res.status(200).json(deletedAttachment);
};

module.exports = {
    attach,
    deattach
};