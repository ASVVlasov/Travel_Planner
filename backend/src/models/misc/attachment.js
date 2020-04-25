const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
Прикрепляемые документы
*/

const attachmentSchema = new Schema({
    name: String, // Краткое имя (например, Бронь.pdf)
    path: String // Путь на сервере
})

module.exports = mongoose.model("attachment", attachmentSchema);