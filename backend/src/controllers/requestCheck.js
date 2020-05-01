const travelerID = (req, res) => {
    if (!req.body.travelerID) {
        res.status(400).json({
            status: "Request error: empty travelerID",
        });
        return false
    }
    return true
}

module.exports = {
    travelerID,
}