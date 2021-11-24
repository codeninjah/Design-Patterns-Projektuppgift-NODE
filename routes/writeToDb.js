const fs = require('fs');

const writeToDb = (array, name) => {
    let readData = fs.readFileSync("./database.json")
    let parsedData = JSON.parse(readData)
    parsedData [name] = array
    
    let stringData = JSON.stringify(parsedData)
    fs.writeFileSync('./database.json', stringData)
}

module.exports = {
    writeToDb
}