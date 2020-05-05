const haveID = (id) => {
    return (!!id) ? true : false;
};
const haveType = haveID;
const haveFileName = haveID;
const recordExists = async (id, Model) => {
    return (await Model.findById(id) !== null) ? true : false
}
const typeExists = async (type) => {
    switch (type) {
        case "transport":
        case "entertaiment":
        case "accomodation":
        case "todo":
            return true;
        default:
            return false;
    }
}
const canUpdate = (updatedFields) => {
    return (Object.keys(updatedFields).length !== 0) ? true : false
}

module.exports = {
    haveType,
    haveFileName,
    haveID,
    recordExists,
    typeExists,
    canUpdate
}