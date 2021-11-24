const { Users } = require("../database.json");
const { Router } = require("express");
const { InvalidParam, NoUser } = require("../errors")
const { writeToDb } = require("./writeToDb")

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
    throw new InvalidParam(["id"])
    // fel statuskod
  }
  const user = Users.find(element => element.login == id)
  if (!user) {
    throw new NoUser(["id"])
  }
  res.status(200).json({data : user});
});
router.post("/users", (req, res) => {
  const { name } = req.body

  // lägg till namn i array
  // testa om array blir större?
  // testa om det blir fel
  res.send(name + " is registered");
});
router.delete("/users/:id", (req, res) => {
  const id = req.params.id
  if (!id) {
    throw new InvalidParam(["id"])
    // fel statuskod
  }
  // deleteta namn i array
  // testa om arrayn blir mindre?
  // testa om det blir fel
  const user = Users.find(element => element.login == id)
  const index = Users.indexOf(user)
  const newUsers = Users.filter(element => {
    return element.login != id
  })
  // not now
  // writeToDb(newUsers, "Users")
  res.send(user.name + " is deleted");
});

module.exports = router;
