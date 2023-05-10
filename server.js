import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;
const uri = process.env.DB_URI;
const connection = mongoose.connection;

app.use(cors);
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true });

connection.once("open", () => {
  console.log("Database connection established successfully!!!");
});

connection.on("error", () => {
  console.log("Error connecting to database!");
});

app.listen(port, () => {
  console.log("Listening on port :", port);
});
