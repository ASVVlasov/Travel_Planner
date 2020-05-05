const Traveler = require("../../models/traveler.js")
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const read = async (req) => {
    if (!Request.haveID(req.body.travelerID)) {
        return ErrorHandler.emptyField("travelerID")
    }
    if (!(await Request.recordExists(req.body.travelerID, Traveler))) {
        return ErrorHandler.wrongField("travelerID", req.body.travelerID)
    }
    try {
        let traveler = await Traveler.findById(req.body.travelerID)
        if (traveler === null) {
            throw ({
                status: "wrong traveler"
            })
        }
        return ({
            statusCode: 200,
            result: traveler
        })
    } catch (err) {
        return ErrorHandler.readError(err)
    }
};

module.exports = read