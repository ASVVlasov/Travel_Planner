const Traveler = require("../../models/traveler.js");
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const destroy = async (req, res) => {
    if (!Request.haveID(req.body.travelerID)) {
        ErrorHandler.emptyField(req, res, "travelerID");
        return;
    }
    if (!(await Request.recordExists(req.body.travelerID, Traveler))) {
        ErrorHandler.wrongID(req, res, "traveler");
        return;
    }
    try {
        let deletedTraveler = await Traveler.findById(req.body.travelerID)
        await Traveler.deleteOne({
            _id: req.body.travelerID
        })
        res.status(200).json({
            status: `Traveler ${deletedTraveler.login} deleted`
        })
    } catch (err) {
        ErrorHandler.deleteError(req, res, err)
    }
};

module.exports = destroy;