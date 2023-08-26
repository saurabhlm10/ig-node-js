const express = require("express");

const app = express();

app.get("/:t", (req, res) => {
  console.log(req.params);
  res.send("Hello, TypeScript Express Server!");
});

module.exports = app;
