const Attachment = require("../../models/misc/attachment.js");
const Board = require("../../models/board.js")

const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")


function attachFile(req) {
    //TODO выкладка файл на сервер
    return "path on server or null"
}

function deattachFile(path) {
    // TODO функция удаления файла на сервере
    return true
}

const attach = async (req, res) => {
    if (!Request.haveID(req.body.boardID)) {
        ErrorHandler.emptyID(req, res, "board");
        return;
    }
    if (!(await Request.recordExists(req.body.boardID, Board))) {
        ErrorHandler.wrongID(req, res, "board");
        return;
    }
    if (!Request.haveType(req.body.cardType)) {
        ErrorHandler.emptyID(req, res, req.body.cardType);
        return;
    }
    if (!Request.typeExists(req.body.cardType)) {
        ErrorHandler.wrongType(req, res, req.body.cardType)
    }
    if (!Request.haveID(req.body.cardID)) {
        ErrorHandler.emptyID(req, res, "card");
        return;
    }
    if (!Request.haveFileName(req.body.attachment.name)) {
        ErrorHandler.emptyFileName(req, res);
        return;
    }
    let path = attachFile(req);
    if (!path) {
        ErrorHandler.fileUploadError(req, res);
        return;
    }
    try {
        let board = await Board.findById(req.body.boardID)
        let newAttachment = new Attachment({
            name: req.body.attachment.name,
            path: path
        })
        let card = board[req.body.cardType + "Cards"].id(req.body.cardID)
        if (card === null) throw ({
            status: "wrong card"
        })
        card.attachments.push(newAttachment)
        await board.save()
        res.status(200).json(newAttachment);
    } catch (err) {
        res.status(500).json(err)
    }
};

const deattach = async (req, res) => {
    if (!Request.haveID(req.body.boardID)) {
        ErrorHandler.emptyID(req, res, "board");
        return;
    }
    if (!(await Request.recordExists(req.body.boardID, Board))) {
        ErrorHandler.wrongID(req, res, "board");
        return;
    }
    if (!Request.haveType(req.body.cardType)) {
        ErrorHandler.emptyID(req, res, req.body.cardType);
        return;
    }
    if (!Request.typeExists(req.body.cardType)) {
        ErrorHandler.wrongType(req, res, req.body.cardType)
    }
    if (!Request.haveID(req.body.cardID)) {
        ErrorHandler.emptyID(req, res, "card");
        return;
    }
    if (!Request.haveFileName(req.body.attachment.name)) {
        ErrorHandler.emptyFileName(req, res);
        return;
    }
    try {
        let board = await Board.findById(req.body.boardID)
        let newAttachment = new Attachment({
            name: req.body.attachment.name,
            path: path
        })
        let card = board[req.body.cardType + "Cards"].id(req.body.cardID)
        if (card === null) throw ({
            status: "wrong card"
        })
        let deletedAttachment = card.attachments.id(req.body.attachmentID)
        if (!deattachFile(deletedAttachment.path)) throw (deletedAttachment.path)
        card.attachments.id(req.body.attachmentID).remove();
        await board.save()
        res.status(200).json(deletedAttachment);
    } catch (err) {
        ErrorHandler.fileDeleteError(req, res, err)
    }
}
module.exports = {
    attach,
    deattach,
};