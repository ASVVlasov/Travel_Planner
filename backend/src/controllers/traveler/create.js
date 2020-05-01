const Traveler = require("../../models/traveler.js");
const ErrorHandler = require("../errorHandler.js")

const create = async (req, res) => {
    const {
        login,
        password,
        mail
    } = req.body;

    try {
        const newTraveler = await Traveler.create({
            login: login,
            password: password,
            mail: mail,
        });
        res.json(newTraveler);
    } catch (err) {
        ErrorHandler.createError(req, res, err)
    }
};

module.exports = create;