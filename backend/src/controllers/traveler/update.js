const Traveler = require("../../models/traveler.js");
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const update = async (req, res) => {
    if (!Request.haveID(req.body.travelerID)) {
        ErrorHandler.emptyField(req, res, "travelerID");
        return;
    }
    if (!(await Request.recordExists(req.body.travelerID, Traveler))) {
        ErrorHandler.wrongField(req, res, "travelerID", req.body.travelerID);
        return;
    }
    if (!Request.canUpdate(req.body.traveler)) {
        ErrorHandler.emptyUpdate(req, res, "traveler");
        return;
    }
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