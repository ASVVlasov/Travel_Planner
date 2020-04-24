const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
Цена на карточку
*/

const costSchema = new Schema({
    value: mongoose.Decimal128,
    currency: String
})

module.exports = mongoose.model("cost", costSchema);