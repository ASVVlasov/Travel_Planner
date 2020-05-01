const Traveler = require("../../models/traveler.js");
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const update = async (req, res) => {
    if (!(Request.haveID(req.body.travelerID, res) &&
            await Request.recordExists(res, req.body.travelerID, Traveler) &&
            Request.canUpdate(req.body.traveler, res))) return;
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