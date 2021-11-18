
const { Router } = require("express")

// req controller


const router = Router()

router.get("/cart", (req, res) => { res.send("skurt was here")} )


module.exports = router