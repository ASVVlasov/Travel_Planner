const Traveler = require("../models/traveler.js");

const travelerID = (req, res) => {
    if (!req.body.travelerID) {
        res.status(400).json({
            status: "Request error: empty travelerID",
        });
        return false
    } else return true
};

const travelerExists = async (req, res) => {
    if (await Traveler.findById(req.body.travelerID) === null) {
        res.status(400).json({
            status: "Request error: wrong id",
        })
        return false
    } else return true
}
const travelerCanUpdate = (req, res) => {
    if (Object.keys(req.body.traveler).length == 0) {
        res.status(400).json({
            status: "nothing to update"
        })
        return false
    } else return true


}

module.exports = {
    travelerID,
    travelerExists,
    travelerCanUpdate
}