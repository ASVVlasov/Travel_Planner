const Traveler = require("../../models/traveler.js")
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const destroy = async (req) => {
    if (!Request.haveID(req.body.travelerID)) {
        return ErrorHandler.emptyField("travelerID")
    }
    if (!(await Request.recordExists(req.body.travelerID, Traveler))) {
        return ErrorHandler.wrongField("travelerID", req.body.travelerID)
    }
    try {
        let deletedTraveler = await Traveler.findById(req.body.travelerID)
        await Traveler.deleteOne({
            _id: req.body.travelerID
        })
        return ({
            statusCode: 200,
            result: `Traveler ${deletedTraveler.login} deleted`
        })
    } catch (err) {
        return ErrorHandler.deleteError(err)
    }
};

module.exports = destroy;