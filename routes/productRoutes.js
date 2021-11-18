
const { Router } = require("express")

// req controller


const router = Router()

router.get("/products", (req, res) => {res.send("skurt was here")} )
router.get("/products/:id", (req, res) => {res.send("skurt was here")} )
router.post("/products", (req, res) => {res.send("skurt was here")} )
router.patch("/products/:id", (req, res) => {res.send("skurt was here")} )
router.delete("/products/:id", (req, res) => {res.send("skurt was here")} )


module.exports = router