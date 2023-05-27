// for using ES6 modules add in package.json before scripts
// "type": "module",

// import express from "express";
const express = require('express');
// import cors from "cors";
const cors = require('cors');
// import mongoose from "mongoose";
const mongoose = require('mongoose');
// import * as dotenv from "dotenv";

// import donorRouter from "./routes/donor.js";
const donorRouter = require('./routes/donor');
const authentication = require('./routes/authentication');

// dotenv.config();
require('dotenv').config();

// const app = express();
const app = express();
const port = process.env.PORT || 5001;
const uri = process.env.DB_URI;
const connection = mongoose.connection;

// app.use(cors);
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true });

connection.once('open', () => {
  console.log('Database connection established successfully!!!');
});

connection.on('error', () => {
  console.log('Error connecting to database!');
});

// defining routes using models
app.use('/donor', donorRouter);
app.use('/auth', authentication);

// default status codes!
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});

app.listen(port, () => {
  console.log('Listening on port: ', port);
});
