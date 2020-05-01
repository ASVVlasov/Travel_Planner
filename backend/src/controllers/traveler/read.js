const Traveler = require("../../models/traveler.js");
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const read = async (req, res) => {
    if (!Request.haveID(req.body.travelerID)) ErrorHandler.emptyID(req, res, "traveler");
    if (!Request.recordExists(req.body.travelerID, Traveler)) ErrorHandler.wrongID(req, res, "traveler");
    try {
        let traveler = await Traveler.findById(req.body.travelerID);
        if (traveler === null) throw (err)
        res.json(traveler);
    } catch (err) {
        ErrorHandler.readError(req, res, err)
    }
};

module.exports = read;