// for using ES6 modules add in package.json before scripts
// "type": "module",

// import express from "express";
const express = require("express");
// import cors from "cors";
const cors = require("cors");
// import mongoose from "mongoose";
const mongoose = require("mongoose");
// import * as dotenv from "dotenv";

// import donorRouter from "./routes/donor.js";
const donorRouter = require("./routes/donor");
const Donor = require("./model/donor.model.js");

// dotenv.config();
require("dotenv").config();

// const app = express();
const app = express();
const port = process.env.PORT || 5001;
const uri = process.env.DB_URI;
const connection = mongoose.connection;

// app.use(cors);
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true });

connection.once("open", () => {
  console.log("Database connection established successfully!!");
});

connection.on("error", () => {
  console.log("Error connecting to database!");
});

// defining routes using models
app.use("/donor", donorRouter);

// app.get("/", (req, res) => {
//   // Donor.find()
//   //   .then((donors) => res.json(donors))
//   //   .catch((err) => res.status(400).json("Error finiding donors : ", err));
//   console.log("how do i expect this to be called? ");
//   res.send("Hellowww, world!");
// });

// app.post("/add", (req, res) => {
//   // const donorName = req.body.donorName;
//   // const newDonor = new Donor({ donorName });

//   // newDonor
//   //   .save()
//   //   .then(() => res.json("New donor added!"))
//   //   .catch((err) => res.status(400).json("Error adding new donors : ", err));
//   res.send("Hellowww, world!");
// });

app.listen(port, () => {
  console.log("Listening on port: ", port);
});
