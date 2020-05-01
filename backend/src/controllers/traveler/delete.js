const Traveler = require("../../models/traveler.js");
const ErrorHandler = require("../errorHandler.js")
const Request = require("../requestCheck.js")

const destroy = async (req, res) => {
    if (!(Request.haveID(req.body.travelerID, res) &&
            await Request.recordExists(res, req.body.travelerID, Traveler))) return
    try {
        let deletedTraveler = await Traveler.findById(id)
        await Traveler.deleteOne({
            _id: id
        })
        res.status(200).json({
            status: `Traveler ${deletedTraveler.login} deleted`
        })
    } catch (err) {
        ErrorHandler.deleteError(req, res, err)
    }
};

module.exports = destroy;