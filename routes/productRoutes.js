const { Router } = require("express");
const request = require("superagent");
const { off } = require("superagent");
const { Products } = require("../database.json");
const { InvalidParam, NoProduct, AlreadyExists, InvalidBody, DoesntExist } = require("../errors")
const { writeToDb } = require("./writeToDb")
const { isValidNumber } = require("./isValidNumber")

const { v4: uuidv4 } = require('uuid');

const router = Router()

router.get("/products", (req, res) => {
    res.status(200).json({data : Products});    
} )
router.get("/products/:id", (req, res) => {
    const { id } = req.params
    if(!id) {
        throw new InvalidParam("No id!")
    }
    const product = Products.find(element => element.id == id)
    if(!product) {
        throw new NoProduct("No product!")
    }

    res.status(200).json({data: product})
} )


router.post("/products", (req, res) => {
    const { name, price } = req.body
    if(!name || !price || !isValidNumber(price)){
        throw new InvalidParam()
    }
    const product = Products.find(element => element.name == name)
    if(product) {
        throw new AlreadyExists(product.name)
    }

    Products.push({"id": uuidv4(), name, price}) //Generera och lägga till id samt pris?
    res.send(name + " is registered")
} )

router.patch("/products/:id", (req, res) => {
    const { name } = req.body
    const { id } = req.params
    if(!id || id === "undefined"){
        throw new InvalidParam()
    }  
    if(!name){
        throw new InvalidBody(["name"])
    }

    const product = Products.find(element => element.id == id)
    if (!product) {
        throw new DoesntExist(name)
    }

    product.name = name  
    res.send(name + " was updated")
} )


router.delete("/products/:id", (req, res) => {
    const { id } = req.params
    if(!id){
        throw new InvalidParam()
    }    

    //Ev snygga till koden
    const product = Products.find(element => element.id == id)
    const index = Products.indexOf(product)

    Products.splice(index, 1)
    const newProducts = []

    for(var prod of Products){
        newProducts.push(prod)
    }

    writeToDb(newProducts, "Products")
    res.send(product.name + " is deleted")
} )


module.exports = router