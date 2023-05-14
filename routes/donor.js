// import express from "express";
const express = require("express");
// import Donor from "../model/donor.model.js";
const Donor = require("../model/donor.model.js");

const router = express.Router();

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

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const bloodGroup = req.body.bloodGroup;
  const contact = Number(req.body.contact);
  const address = req.body.address;
  const dob = Date.parse(req.body.dob);
  const recency = Date.parse(req.body.recency);
  const nid = req.body.nid;

  const newDonor = new Donor({
    name,
    email,
    password,
    bloodGroup,
    contact,
    address,
    dob,
    recency,
    nid,
  });

  // console.log("Donor: ", newDonor);
  // console.log("type of contact address: ", typeof newDonor.contact);

  newDonor
    .save()
    .then(() => res.json("New donor added!"))
    .catch((err) => res.status(400).json("Error adding new donors : ", err));
});

router.route("/").get((req, res) => {
  Donor.find()
    .then((donors) => res.json(donors))
    .catch((err) => res.status(400).json("Error finiding donors : ", err));

  // res.send("Hellowww, world!");
});

router.route("/:id").get((req, res) => {
  Donor.findById(req.params.id)
    .then((donor) => res.json(donor))
    .catch((err) => {
      res.status(400).json("Error finding individual donor: ", err);
    });
});

router.route("/update/:id").post((req, res) => {
  Donor.findById(req.params.id)
    .then((donor) => {
      donor.name = req.body.name;
      donor.email = req.body.email;
      donor.password = req.body.password;
      donor.bloodGroup = req.body.bloodGroup;
      donor.contact = Number(req.body.contact);
      donor.address = req.body.address;
      donor.dob = Date.parse(req.body.dob);
      donor.recency = Date.parse(req.body.recency);
      donor.nid = req.body.nid;

      donor
        .save()
        .then(() => res.send("Donor info updated!"))
        .catch((err) =>
          res.status(400).json("Error updating donor info: ", err)
        );
    })
    .catch((err) => {
      res.status(400).json("Error updating donor info: ", err);
    });
});

router.route("/:id").delete((req, res) => {
  Donor.findByIdAndDelete(req.params.id)
    .then(() => res.send("Donor removed!"))
    .catch((err) => {
      res.status(400).json("Error removing donor: ", err);
    });
});

// export default router;
module.exports = router;
