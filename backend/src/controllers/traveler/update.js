const Traveler = require("../../models/traveler.js");
const ErrorHandler = require("../errorHandler.js")
const RequestCheck = require("../requestCheck.js")

const update = async (req, res) => {
    if (!(RequestCheck.travelerID(req, res) &&
            RequestCheck.travelerExists(req, res) &&
            RequestCheck.travelerCanUpdate(req, res))) return;
    try {
        await Traveler.updateOne({
            _id: req.body.travelerID
        }, {
            $set: req.body.traveler
        })
        let updatedTraveler = await Traveler.findById(req.body.travelerID)
        res.json(updatedTraveler)
    } catch (err) {
        ErrorHandler.updateError(req, res, err)
    }
}

module.exports = update;