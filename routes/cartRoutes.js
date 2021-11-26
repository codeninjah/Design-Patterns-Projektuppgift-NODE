
const { Router } = require("express")
const { Products, Carts } = require("../database.json")

// req controller


const router = Router()

router.get("/cart/:userLogin", (req, res) => { 
    res.send("skurt was here")
})
router.post("/cart/:userLogin", (req, res) => { 
const { amount, productId } = req.body
const { userLogin } = req.params
// kontroll av värden
const product = Products.find(element => element.id == productId)
Carts.push({userLogin, productId, amount})
console.log("fel")

res.send(amount + " " + product.name + " is added to cart") 
} )
router.put("/cart/:userLogin/:itemId", (req, res) => { res.send("skurt was here")} )
router.delete("/cart/:userLogin/:itemId", (req, res) => { res.send("skurt was here")} )


module.exports = router