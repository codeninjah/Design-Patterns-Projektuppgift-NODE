const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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


let readData = fs.readFileSync("./database.json")
let parsedData = JSON.parse(readData)
function seed(key, array){
    parsedData[key] = []
    for(let name of array) {
        if (key == "Products") {
            const randomPrice = Math.floor(Math.random() * 100)
            parsedData[key].push(
                {
                    "id": uuidv4(),
                "name": name,
                "price": `${randomPrice} SEK`
                }
            )
        } else {
            parsedData[key].push(
                {
                    "name": name,
                    "login": uuidv4()
                }
            )
        }
    }}
    
seed("Products", Products)
seed("Users", Users)

let stringData = JSON.stringify(parsedData)
fs.writeFileSync('./database.json', stringData)
