const { Router } = require("express");
const request = require("superagent");
const { off } = require("superagent");
const { Products } = require("../database.json");
const { InvalidParam, NoProduct, AlreadyExists } = require("../errors")
const { writeToDb } = require("./writeToDb")

const { v4: uuidv4 } = require('uuid');

// req controller


const router = Router()

router.get("/products", (req, res) => {
    //   console.log(Users);
    //   res.setHeader('content-type', 'application/json');
    res.status(200).json({data : Products});    
} )
router.get("/products/:id", (req, res) => {
    //res.send("skurt was here")
    const id = req.params.id
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
    //price += " SEK"
    if(!name || !price){
        throw new InvalidParam("Name OR price must be filled")
    }

    //console.log(Products.find(element => element.name == "Skurt"))
    const product = Products.find(element => element.name == name)
    if(product) {
        throw new AlreadyExists(product.name)
    }

    Products.push({"id": uuidv4(), name, price}) //Generera och lägga till id samt pris?
    res.send(name + " is registered")
} )

router.patch("/products/:id", (req, res) => {
    const { name } = req.body
    const id = req.params.id
    const product = Products.find(element => element.id == id)

    product.name = name
    res.send(name + " was updated")
} )


router.delete("/products/:id", (req, res) => {
    //res.send("skurt was here")
    const id = req.params.id
    if(!id){
        throw new InvalidParam("No Id!")
    }    

    //Ev snygga till koden
    const product = Products.find(element => element.id == id)
    const index = Products.indexOf(product)
    console.log(index)
    Products.splice(index, 1)
    const newProducts = []

    for(var prod of Products){
        newProducts.push(prod)
    }

    writeToDb(newProducts, "Products")
    res.send(product.name + " is deleted")
} )


module.exports = router