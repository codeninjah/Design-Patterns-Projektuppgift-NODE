const { Users } = require("../database.json");
const { Router } = require("express");

// req controller

const router = Router();

router.get("/users", (req, res) => {
//   console.log(Users);
//   res.setHeader('content-type', 'application/json');
  res.status(200).json({data : Users});
});
router.get("/users/:id", (req, res) => {
  const id = req.params.id
  if (!id) {
    throw new Error("wrong param")
    // fel statuskod
  }
  const user = Users.find(element => element.login == id)
  res.status(200).json({data : user});
});
router.post("/users", (req, res) => {
  res.send("skurt was here");
});
router.delete("/users/:id", (req, res) => {
  res.send("skurt was here");
});

module.exports = router;
