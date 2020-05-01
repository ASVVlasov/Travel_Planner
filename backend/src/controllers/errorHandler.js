const createError = (req, res, err) => {
    res.status(500).json({
        status: "Database error: can't create entry",
        error: err,
    });
}

const readError = (req, res, err) => {
    res.status(500).json({
        status: "Database error: can't read entry / entry doesn't exist",
        error: err,
    });
}

const updateError = (req, res, err) => {
    res.status(500).json({
        status: "Database error: can't update entry / entry doesn't exist",
        error: err,
    });

}

module.exports = {
    createError,
    readError,
    updateError,
}