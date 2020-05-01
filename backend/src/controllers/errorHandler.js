const createError = (req, res, err) => {
    res.status(500).json({
        status: "Database error: can't create entry",
        error: err,
    });
}

module.exports = {
    createError,
}