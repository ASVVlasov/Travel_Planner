const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Заглушки пока не определимся с составом информации
let attachmentSchema = new Schema({ //Прикрепленные файлы
    name: String,
    path: String
})
/*
Основные данные по списку дел: заголовок, детальное описане, когда нужно сделать.
*/
const todoCardSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    travelers: [String], //same as traveler.id type
    isDone: {
        type: Boolean,
        default: false
    },
    header: {
        type: String,
    },
    details: {
        type: String,
    },
    todoDate: {
        type: String,
    },
    attachments: [attachmentSchema],

});

module.exports = mongoose.model("todoCard", todoCardSchema);