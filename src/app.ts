import express, { Express } from "express";

const app: Express = express();

app.get("/:t", (req, res) => {
  console.log(req.params);
  res.send("Hello, TypeScript Express Server!");
});

export default app;
