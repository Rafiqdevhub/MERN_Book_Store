import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import booksRoute from "./route/booksRoute.js";

const app = express();
dotenv.config();
const port = 5000;

app.use(express.json());

app.use("/api/books", booksRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
