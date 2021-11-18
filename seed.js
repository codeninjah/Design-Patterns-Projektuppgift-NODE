const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
uuidv4();

let Products = [
    "Apple", 
    "Banan", 
    "Kiwi", 
    "Ananas", 
    "Majs", 
    "Lök", 
    "Vitlök", 
    "Ginger",
    "Tomat",
    "Jordgubbar",
    "Blåbär",
    "Hallon",
    "Päron",
    "Sallad",
    "Plummon",
    "Lime",
    "Mandarin",
    "Mellon",
    "Gurka",
    "Oliver"
] 


let data = fs.readFileSync("./database.json")
let row = JSON.parse(data)
console.log(row)

function seed(key, object){
row[key] = []
for(let product of row[key]) {
    const rndPrice = Math.floor(Math.random() * 100)
    row[key].push(
        object
    )
    row[key].name = product
}

}
seed("Products", {
    "id": uuidv4(),
   "name": "",
   "price": rndPrice
})

seed("Users", {
    "name": "",
    "login": ""
})

console.log(row)

let newRow = JSON.stringify(row)
fs.writeFileSync('./database.json', newRow)
