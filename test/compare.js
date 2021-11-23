

const compareName = (data, id, name, key) => {
    const user = Array.isArray(data) ? data.find(element => element[key] == id) : data
    return user.name === name
}

module.exports = { compareName }