const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require("./misc/attachment.js")

/*
Основные данные по развлечениям: тип, компания, где, когда(начало/конец).
*/

const entertaimentCardSchema = new Schema({
    travelers: [ObjectId],
    payer: {
        type: ObjectId, // traveler.id who payed
    },
    cost: mongoose.Decimal128,
    type: {
        type: String,
    },
    name: {
        type: String,
    },
    company: {
        type: String,
    },
    place: {
        type: String,
    },
    beginDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    comment: {
        type: String,
    },
    attachments: [Attachment],

});

module.exports = mongoose.model("entertaimentCard", entertaimentCardSchema);