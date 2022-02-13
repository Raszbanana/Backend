const fetch = require('node-fetch');
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/users", (req, res) => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => filterJson(user))
      res.send({
        users: users,
      });
    });
});

app.get("/users/:id", (req, res) => {
  fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    let foundUser = false;
    for (let value of users) {
      if (value.id == req.params.id) {
        foundUser = true;
        filterJson(value)
        res.send(value)
      }
    } if (!foundUser) {
      res.send("User not found")
    }
  }) .catch((error) => {
      res.send(error)
  })
})

const filterJson = (object) => {
  delete object.address;
  delete object.company;
};

app.listen(3000, () => {
  console.log("i listened");
});
