/*Request errors*/
const emptyID = (req, res, entity) => {
    res.status(400).json({
        status: `Request error: empty ${entity}ID`,
    });
}
const wrongID = (req, res, entity) => {
    res.status(400).json({
        status: `Request error: wrong ${entity}ID`,
    });
}
const wrongType = (req, res, entity) => {
    res.status(400).json({
        status: `Request error: wrong card type. Got - ${entity}`,
    });
}
const emptyUpdate = (req, res, entity) => {
    res.status(400).json({
        status: `Request error: nothing to update in ${entity}`
    })
}
/*Response errors*/
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
const deleteError = (req, res, err) => {
    res.status(500).json({
        status: "Database error: can't delete entry / entry doesn't exist",
        error: err,
    });
}

module.exports = {
    /*Request errors*/
    emptyID,
    wrongID,
    wrongType,
    emptyUpdate,
    /*Response errors*/
    createError,
    readError,
    updateError,
    deleteError
}