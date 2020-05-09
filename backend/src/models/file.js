const mongoose = require("mongoose")
const Schema = mongoose.Schema

const fileSchema = new Schema({
    originalName: {
        type: String,
        description: "Оригинальное имя файла(с расширением)"
    },
    uploadName: {
        type: String,
        description: "Имя файла, присвоенное на сервере"
    }
})

module.exports = mongoose.model("File", fileSchema)