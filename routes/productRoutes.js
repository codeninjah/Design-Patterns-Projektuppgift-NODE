
const { Router } = require("express")

// req controller


const router = Router()

router.get("/product", (req, res) => { res.send("skurt was here")} )


module.exports = router