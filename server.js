import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Init
const server = express();
dotenv.config();

// Middleware Setup
server.use(express.json());
server.use(cors());

// Connect To DB
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected To DB"))
  .catch(() => console.error("Error while Connecting To DB"));

// Start Listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started at ${PORT}`));
