const Traveler = require("../../models/traveler.js")
const ErrorHandler = require("../errorHandler.js")

const create = async (req) => {
    try {
        const newTraveler = await Traveler.create(req.body.traveler)
        return ({
            statusCode: 200,
            result: newTraveler
        })
    } catch (err) {
        return ErrorHandler.createError(err)
    }
}

module.exports = create