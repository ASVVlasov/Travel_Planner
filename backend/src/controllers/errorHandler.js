/*Request errors*/
const emptyField = field => ({
    statusCode: 400,
    status: `Request error: empty ${field}`
})
const wrongField = (field, entity) => ({
    statusCode: 400,
    status: `Request error: wrong ${field}. Got - ${entity}`
})
const emptyUpdate = entity => ({
    statusCode: 400,
    status: `Request error: nothing to update in ${entity}`
})
/*Response errors*/
const createError = err => ({
    statusCode: 500,
    status: "Database error: can't create entry",
    error: err,
})

const readError = err => ({
    statusCode: 500,
    status: "Database error: can't read entry / entry doesn't exist",
    error: err,
})

const updateError = err => ({
    statusCode: 500,
    status: "Database error: can't update entry / entry doesn't exist",
    error: err,
})

const deleteError = err => ({
    statusCode: 500,
    status: "Database error: can't delete entry / entry doesn't exist",
    error: err,
})

const fileUploadError = () => ({
    statusCode: 500,
    status: "Server error: can't upload file",
})

const fileDeleteError = err => {
    console.log("Server error: can't delete file on server")
    console.log("Path is: " + err)
    return ({
        statusCode: 500,
        status: "Server error: can't delete file on server",
    })
}

module.exports = {
    /*Request errors*/
    emptyField,
    wrongField,
    emptyUpdate,
    /*Response errors*/
    createError,
    readError,
    updateError,
    deleteError,
    fileUploadError,
    fileDeleteError
}