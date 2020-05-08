const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    title: {
        type: String,
        description: "Имя категории карточки"
    }
})

module.exports = mongoose.model("Category", categorySchema)