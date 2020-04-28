const Traveler = require("../models/traveler.js");

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
        res.status(500).json({
            status: "Database error: can't create entry",
            error: err,
        });
    }
};

const read = async (req, res) => {
    const id = req.body.userID;
    if (id === undefined)
        res.status(400).json({
            status: "Request error: empty id",
        });
    try {
        let traveler = await Traveler.findById(id);
        if (traveler === null) throw (err)
        res.json(traveler);
    } catch (err) {
        res.status(500).json({
            status: "Database error: can't read entry / entry doesn't exist",
            error: err,
        });
    }
};

const update = async (req, res) => {
    const id = req.body.userID;
    if (id === undefined)
        res.status(400).json({
            status: "Request error: empty id",
        });
    if (await Traveler.findById(id) === null)
        res.status(400).json({
            status: "Request error: wrong id",
        });
    try {
        let updatedFields = {};
        if (req.body.login !== undefined) updatedFields.login = req.body.login;
        if (req.body.password !== undefined)
            updatedFields.password = req.body.password;
        if (req.body.mail !== undefined) updatedFields.mail = req.body.mail;
        if (req.body.avatarPath !== undefined)
            updatedFields.avatarPath = req.body.avatarPath;
        console.log(updatedFields)
        if (Object.keys(updatedFields).length == 0) {
            res.status(400).json({
                status: "nothing to update"
            })
        }
        await Traveler.updateOne({
            _id: id
        }, {
            $set: updatedFields
        })
        let updatedTraveler = await Traveler.findById(id)
        res.json(updatedTraveler)
    } catch (err) {
        res.status(500).json({
            status: "Database error: can't update entry / entry doesn't exist",
            error: err,
        });
    }
}

const destroy = async (req, res) => {
    const id = req.body.userID;
    if (id === undefined)
        res.status(400).json({
            status: "Request error: empty id",
        });
    let deletedTraveler = await Traveler.findById(id)
    if (deletedTraveler === null)
        res.status(400).json({
            status: "Request error: wrong id",
        });
    try {
        await Traveler.deleteOne({
            _id: id
        })
        res.status(200).json({
            status: `Traveler ${deletedTraveler.login} deleted`
        })
    } catch (err) {
        res.status(500).json({
            status: "Database error: can't delete entry / entry doesn't exist",
            error: err,
        });

    }
};

module.exports = {
    create,
    read,
    update,
    destroy
};