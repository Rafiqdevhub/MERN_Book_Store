import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

const app = express();
dotenv.config();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
