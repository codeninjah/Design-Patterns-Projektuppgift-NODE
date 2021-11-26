
const { Router } = require("express")
const { Products, Carts, Users } = require("../database.json")
const { NoUser, NoProduct, InvalidBody } = require("../errors")

// req controller


const router = Router()

//Följande måste lösas
function isValidNumber(num) {
    return typeof num === 'number' && !isNaN(num);
}

router.get("/cart/:userLogin", (req, res) => { 
    res.send("skurt was here")
})
router.post("/cart/:userLogin", (req, res) => { 
const { amount, productId } = req.body
const { userLogin } = req.params


if(!isValidNumber(amount)){
    throw new InvalidBody()
}

const user = Users.find(element => element.login == userLogin)
if(!user){
    throw new NoUser()
}

const product = Products.find(element => element.id == productId)
if(!product){
    throw new NoProduct()
}
Carts.push({userLogin, productId, amount})
console.log("fel")

res.send(amount + " " + product.name + " is added to cart") 
} )
router.put("/cart/:userLogin/:itemId", (req, res) => { res.send("skurt was here")} )
router.delete("/cart/:userLogin/:itemId", (req, res) => { res.send("skurt was here")} )


module.exports = router