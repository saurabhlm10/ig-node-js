const express = require("express");
const connectToDb = require("./config/db");
const cors = require('cors')
const morgan = require("morgan");

connectToDb()

const app = express();

app.use(cors());
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/:t", (req, res) => {
  console.log(req.params);
  res.send("Hello, TypeScript Express Server!");
});

module.exports = app;
