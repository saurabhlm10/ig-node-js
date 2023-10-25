import express from "express";
import connectToDb from "./config/db";
import cors from 'cors';
import morgan from "morgan";

connectToDb();

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/:t", (req, res) => {
  console.log(req.params);
  res.send("Hello, TypeScript Express Server!");
});

export default app;
