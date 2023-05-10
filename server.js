import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors);
app.use(express.json());

// mongoose.connect(process.env.DB_URI);

app.listen(port, () => {
  console.log("Listening on port :", port);
});
