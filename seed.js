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

let data = fs.readFileSync("./model/products.json")
let row = JSON.parse(data)
console.log(row)

row.Products = []
for(let product of Products) {
    const rndPrice = Math.floor(Math.random() * 100)
    row.Products.push(
        {
            "id": uuidv4(),
           "name": product,
           "price": rndPrice
        }
    )
}

console.log(row)

let newRow = JSON.stringify(row)
fs.writeFileSync('./model/products.json', newRow)
