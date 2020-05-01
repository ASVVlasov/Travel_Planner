const Traveler = require("../../models/traveler.js");
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const read = async (req, res) => {
    if (!Request.haveID(req.body.travelerID, res)) return;
    try {
        let traveler = await Traveler.findById(req.body.travelerID);
        if (traveler === null) throw (err)
        res.json(traveler);
    } catch (err) {
        ErrorHandler.readError(req, res, err)
    }
};

module.exports = read;