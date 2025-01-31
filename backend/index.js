import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import booksRoute from "./route/booksRoute.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/books", booksRoute);

// Not Found
app.get("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
