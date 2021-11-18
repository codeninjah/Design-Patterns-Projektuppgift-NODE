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
let Users = [
    "Kalle",
    "Sven",
    "Anders", 
    "Romina",
    "Nillufar",
    "Alex",
    "Simon",
    "David",
    "Viktor",
    "Lotta",
    "Pelle",
    "André",
    "Lotta",
    "Olof",
    "Sven-Åke",
    "Carl",
    "Jörgen",
    "Sofia",
    "Eva",
    "Sofia",
    "Henry"    
]


let data = fs.readFileSync("./database.json")
let row = JSON.parse(data)
function seed(key, array){
    row[key] = []
    for(let name of array) {
        if (key == "Products") {
            const rndPrice = Math.floor(Math.random() * 100)
            row[key].push(
                {
                    "id": uuidv4(),
                "name": name,
                "price": rndPrice
                }
            )
        } else {
            row[key].push(
                {
                    "name": name,
                    "login": uuidv4()
                }
            )
        }
    }}
    
seed("Products", Products)
seed("Users", Users)

let newRow = JSON.stringify(row)
fs.writeFileSync('./database.json', newRow)
