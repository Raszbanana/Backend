const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/users", (req, res) => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => filterJson(user));
      res.send({
        users,
      });
    });
});

app.get("/users/:id", (req, res) => {
  fetch(`https://jsonplaceholder.typicode.com/users/${req.params.id}`)
    .then((response) => response.json())
    .then((user) => {
      filterJson(user);
      res.send(user);
    })
    .catch((error) => {
      res.send(error);
    });
});

const filterJson = (object) => {
  delete object.address;
  delete object.company;
};

app.listen(3000, () => {
  console.log("i listened");
});
