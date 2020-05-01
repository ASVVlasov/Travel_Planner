const Traveler = require("../models/traveler.js");

const haveID = (id, res) => {
    if (!id) {
        res.status(400).json({
            status: "Request error: empty ID",
        });
        return false
    } else return true
};

const recordExists = async (res, id, Model) => {
    if (await Model.findById(id) === null) {
        res.status(400).json({
            status: "Request error: wrong id",
        })
        return false
    } else return true
}
const canUpdate = (updatedFields, res) => {
    if (Object.keys(updatedFields).length == 0) {
        res.status(400).json({
            status: "Request error: nothing to update"
        })
        return false
    } else return true
}

module.exports = {
    haveID,
    recordExists,
    canUpdate
}