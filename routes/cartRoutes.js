
const { Router } = require("express")
const { Products, Carts, Users } = require("../database.json")
const { NoUser, NoProduct, InvalidBody } = require("../errors")
const { writeToDb } = require("./writeToDb")

// req controller


const router = Router()

//Följande måste lösas
function isValidNumber(num) {
    return typeof num === 'number' && !isNaN(num);
}

router.get("/cart/:userLogin", (req, res) => { 
    const { userLogin } = req.params
    const user = Users.find(element => element.login == userLogin)
    if(!user){
        throw new NoUser()
    }
    const CartList = Carts.filter(element => element.userLogin = userLogin)
    res.status(200).json({data : CartList})
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
const newCarts = Carts
newCarts.push({userLogin, productId, amount})
writeToDb(newCarts, "Carts")

res.send(amount + " " + product.name + " is added to cart") 
} )

router.patch("/cart/:userLogin/:itemId", (req, res) => { 
    const { amount } = req.body
    const { itemId, userLogin } = req.params
    if(!isValidNumber(amount)){
        throw new InvalidBody()
    }
    const user = Users.find(element => element.login == userLogin)
    if(!user){
        throw new NoUser()
    }
    const product = Products.find(element => element.id == itemId)
    if(!product){
        throw new NoProduct()
    }
    const cartList = Carts.filter(element => element.userLogin = userLogin)
    const cart = cartList.find(element => element.productId === itemId)
    writeToDb(Carts, "Carts")
    res.send("The amount of " + product.name + " is changed to " + amount + " and will cost " + (amount * product.price) + "SEK")
} )

router.delete("/cart/:userLogin/:itemId", (req, res) => { 
    const { itemId, userLogin } = req.params
    const user = Users.find(element => element.login == userLogin)
    if(!user){
        throw new NoUser("There is no user with that id")
    }
    const product = Products.find(element => element.id == itemId)
    if(!product){
        throw new NoProduct("There is no product with that id")
    }

    const newCart = []
    for(let cart of Carts){
        if(cart.userLogin != userLogin && cart.productId != itemId) {
            newCart.push(cart)
        }
    }
    writeToDb(newCart, "Carts")
    res.send(product.name + " is deleted")
} )


module.exports = router