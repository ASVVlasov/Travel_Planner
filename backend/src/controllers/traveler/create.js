const Traveler = require("../../models/traveler.js");
const ErrorHandler = require("../errorHandler.js")

const create = async (req, res) => {
    try {
        const newTraveler = await Traveler.create(req.body.traveler);
        res.json(newTraveler);
    } catch (err) {
        ErrorHandler.createError(req, res, err)
    }
};

module.exports = create;