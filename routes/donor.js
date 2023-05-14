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
  const donorName = req.body.donorName;
  const newDonor = new Donor({ donorName });
  newDonor
    .save()
    .then(() => res.json("New donor added!"))
    .catch((err) => res.status(400).json("Error adding new donors : ", err));
});

// export default router;
module.exports = router;
