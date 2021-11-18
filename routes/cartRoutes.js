
const { Router } = require("express")

// req controller


const router = Router()

router.get("/cart/:userLogin", (req, res) => { res.send("skurt was here")} )
router.post("/cart/:userLogin", (req, res) => { res.send("skurt was here")} )
router.put("/cart/:userLogin/:itemId", (req, res) => { res.send("skurt was here")} )
router.delete("/cart/:userLogin/:itemId", (req, res) => { res.send("skurt was here")} )


module.exports = router