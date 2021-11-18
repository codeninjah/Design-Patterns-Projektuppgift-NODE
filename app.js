const express = require("express");

const app = express();

app.use(express.json());

const routes = require("./routes")

app.use("/api", routes.productRoutes)
app.use("/api", routes.cartRoutes)
app.use("/api", routes.userRoutes)

const PORT = 5000

app.listen(PORT, () => console.log(`Running on port ${PORT}`))

module.exports = app