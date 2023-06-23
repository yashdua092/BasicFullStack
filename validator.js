function isInvalidEmail(userObject) {
    return !userObject.email.includes("@") // a very simple test to check if @ there or not
}

function isEmptyPayload(userObject) {
    return Object.keys(userObject).length === 0
}

// nodejs syntax to export a object or function
module.exports = {
    isInvalidEmail,
    isEmptyPayload
}