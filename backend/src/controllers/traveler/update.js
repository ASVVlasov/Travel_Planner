const Traveler = require("../../models/traveler.js")
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const update = async (req, res) => {
    if (!Request.haveID(req.body.travelerID)) {
        return ErrorHandler.emptyField("travelerID")
    }
    if (!(await Request.recordExists(req.body.travelerID, Traveler))) {
        return ErrorHandler.wrongField("travelerID", req.body.travelerID)
    }
    if (!Request.canUpdate(req.body.traveler)) {
        return ErrorHandler.emptyUpdate("traveler")
    }
    try {
        await Traveler.updateOne({
            _id: req.body.travelerID
        }, {
            $set: req.body.traveler
        })
        let updatedTraveler = await Traveler.findById(req.body.travelerID)
        return ({
            statusCode: 200,
            result: updatedTraveler
        })
    } catch (err) {
        return ErrorHandler.updateError(err)
    }
}

module.exports = update