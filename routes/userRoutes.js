const { Users } = require("../database.json");
const { Router } = require("express");
const { InvalidParam, NoUser, AlreadyExists, InvalidBody } = require("../errors")
const { writeToDb } = require("./writeToDb")
const { v4: uuidv4 } = require('uuid');

// req controller

const router = Router();

router.get("/users", (req, res) => {
//   console.log(Users);
//   res.setHeader('content-type', 'application/json');
  res.status(200).json({data : Users});
});
router.get("/users/:id", (req, res) => {
  const { id } = req.params
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

  if(!name){
      throw new InvalidBody(["name"])
  }

  const user = Users.find(element => element.name == name)
  if (user) {
      throw new AlreadyExists(user.name)
  }

  Users.push({name, "login": uuidv4()}) //Generera och lägga till id samt pris?
  res.send(name + " is registered")
});
router.delete("/users/:id", (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new InvalidParam(["id"])
  }
  const user = Users.find(element => element.login == id)
  if (!user) {
    throw new NoUser(["id"])
  }
  const newUsers = Users.filter(element => element.login != id)
  writeToDb(newUsers, "Users")
  res.send(user.name + " is deleted");
});

module.exports = router;
