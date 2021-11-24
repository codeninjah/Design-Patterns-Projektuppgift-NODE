
const { Router } = require("express");
const request = require("superagent");
const { off } = require("superagent");
const { Products } = require("../database.json");
const { InvalidParam, NoProduct } = require("../errors")

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
    const { name } = req.body

    Products.push(name) //Generera och lägga till id samt pris?

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
    const product = Products.find(element => element.id == id)
    
    //Behöver få till slice att fungera

    Products.slice(product, product + 1)
    res.send("Product was deleted")
} )


module.exports = router