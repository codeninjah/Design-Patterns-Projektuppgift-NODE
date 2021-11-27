const fs = require('fs');

let readData = fs.readFileSync("./database.json")
let parsedData = JSON.parse(readData)

let readDataCopy = fs.readFileSync("./databaseCopy.json")
let parsedDataCopy = JSON.parse(readDataCopy)

let stringData = JSON.stringify(parsedDataCopy)
fs.writeFileSync('./database.json', stringData)
