// import express from "express";
const express = require("express");
// import Donor from "../model/donor.model.js";
const Donor = require("../model/donor.model.js");

const router = express.Router();

router.route("/").get((req, res) => {
  Donor.find()
    .then((donors) => res.json(donors))
    .catch((err) => res.status(400).json("Error finiding donors : ", err));

  // res.send("Hellowww, world!");
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  // const password = req.body.password;
  // const bloodGroup = req.body.bloodGroup;
  // const contact = req.body.contact;
  // const address = req.body.address;
  // const dob = req.body.dob;
  // const recency = req.body.recency;
  // const nid = req.body.nid;

  // postman
  // {
  //   "name": "farabi",
  //   "email": "fardinshuvro96@gmail.com",
  //   "password": "1111",
  //   "bloodGroup": "O+",
  //   "contact": "0987655667",
  //   "address": "badda, dhaka",
  //   "dob": "12-22-23",
  //   "recency":"12-22-23",
  //   "nid": "32423492837408327"
  // }

  const newDonor = new Donor({
    name,
    email,
    // password,
    // bloodGroup,
    // contact,
    // address,
    // dob,
    // recency,
    // nid,
  });

  newDonor
    .save()
    .then(() => res.json("New donor added!"))
    .catch((err) => res.status(400).json("Error adding new donors : ", err));
});

// export default router;
module.exports = router;
