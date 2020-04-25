const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require("./misc/attachment.js")

/*
Основные данные по размещению: тип, название, компания, въезд/выезд.
*/

const accomodationCardSchema = new Schema({
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
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    comment: {
        type: String,
    },
    attachments: [Attachment],

});

module.exports = mongoose.model("accomodationCard", accomodationCardSchema);