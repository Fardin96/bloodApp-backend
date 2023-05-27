// import express from "express";
const router = require('express').Router();
// const bcrypt = require("bcrypt");

// import Donor from "../model/donor.model.js";
const Donor = require('../model/donor.model.js');
const {
  passwordHash,
  jwt_token,
} = require('../functions/securityFunctions.js');

// postman
// // {
// //   "name": "farabi",
// //   "email": "fardinshuvro96@gmail.com",
// //   "password": "1111",
// //   "bloodGroup": "O+",
// //   "contact": "0987655667",
// //   "address": "badda, dhaka",
// //   "dob": "12-22-23",
// //   "recency":"12-22-23",
// //   "nid": "32423492837408327"
// // }
// // {
// //   "name": "farabi",
// //   "email": "fardinshuvro96@gmail.com",
// //   "password": "1111",
// //   "bloodGroup": "O+",
// //   "contact": "0987655667",
// //   "address": "badda, dhaka",
// //   "dob": "12-22-23",
// //   "recency":"12-22-23",
// //   "nid": "32423492837408327"
// // }

router.route('/add').post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = await passwordHash(req.body.password);
  const bloodGroup = req.body.bloodGroup;
  const contact = Number(req.body.contact);
  const address = req.body.address;
  const dob = Date.parse(req.body.dob);
  const recency = Date.parse(req.body.recency);
  const nid = req.body.nid;

  // add user
  try {
    const userNameExists = await Donor.findOne({ name });
    const userEmailExists = await Donor.findOne({ email });

    // check duplicate user
    if (!userNameExists || !userEmailExists) {
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
      console.log('sending to server: ', newDonor);

      const token = jwt_token(newDonor._id);

      await newDonor
        .save()
        .then(() => res.json({ token: token }))
        .catch((error) =>
          res.status(401).json('error adding new donors: ', error.message)
        );
    } else {
      res.status(401).json('User already exists!');
    }
  } catch (error) {
    console.log('error finding duplicate user!', error);
  }
});

router.route('/').get((req, res) => {
  Donor.find()
    .then((donors) => res.json(donors))
    .catch((err) => res.status(400).json('Error finiding donors : ', err));

  // res.send("Hellowww, world!");
});

router.route('/:id').get((req, res) => {
  Donor.findById(req.params.id)
    .then((donor) => res.json(donor))
    .catch((err) => {
      res.status(400).json('Error finding individual donor: ', err);
    });
});

router.route('/find').post(async (req, res) => {
  const { email } = req.body;
  // console.log("req.body.email: ", req.body.email);

  await Donor.findOne({ email })
    .then((donor) => {
      // console.log("response in backend finding user by email: ", donor);
      // return donor;
      res.send(donor);
    })
    .catch((err) => {
      res.status(400).json('Error finding individual donor by email: ', err);
    });
});

router.route('/update/:id').post((req, res) => {
  console.log('Reading from backend - userID: ', req.params.id);
  Donor.findById(req.params.id)
    .then(async (donor) => {
      donor.name = req.body.name;
      donor.email = req.body.email;
      donor.password = req.body.password;
      donor.bloodGroup = req.body.bloodGroup;
      donor.contact = Number(req.body.contact);
      donor.address = req.body.address;
      donor.dob = Date.parse(req.body.dob);
      donor.recency = Date.parse(req.body.recency);
      donor.nid = req.body.nid;

      console.log('user info trying to update with ', donor);

      await donor
        .save()
        .then(() => res.send('Donor info updated!'))
        .catch((err) =>
          res.status(400).json('Error updating donor info: ', err)
        );
    })
    .catch((err) => {
      res.status(401).json('Error finding and updating donor: ', err);
    });
});

router.route('/:id').delete((req, res) => {
  Donor.findByIdAndDelete(req.params.id)
    .then(() => res.send('Donor removed!'))
    .catch((err) => {
      res.status(400).json('Error removing donor: ', err);
    });
});

// export default router;
module.exports = router;
