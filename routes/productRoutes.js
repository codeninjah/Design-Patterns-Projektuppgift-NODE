
const { Router } = require("express")
const { Products } = require("../database.json");

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
    const product = Products.find(element => element.id == id)

    res.status(200).json({data: product})
} )


router.post("/products", (req, res) => {res.send("skurt was here")} )
router.patch("/products/:id", (req, res) => {res.send("skurt was here")} )
router.delete("/products/:id", (req, res) => {res.send("skurt was here")} )


module.exports = router