const haveID = (id) => {
    return (!!id) ? true : false;
};

const recordExists = async (id, Model) => {
    return (await Model.findById(id) !== null) ? true : false
}
const canUpdate = (updatedFields) => {
    return (Object.keys(updatedFields).length !== 0) ? true : false
}

module.exports = {
    haveID,
    recordExists,
    canUpdate
}