const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require("./misc/attachment.js").schema

/*
Основные данные по развлечениям: тип, компания, где, когда(начало/конец).
*/

const entertaimentCardSchema = new Schema({
    travelers: [mongoose.ObjectId],
    payer: {
        type: mongoose.ObjectId, // traveler.id who payed
    },
    cost: Number,
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