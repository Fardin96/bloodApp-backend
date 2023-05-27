const router = require("express").Router();
const bcrypt = require("bcrypt");

const { jwt_token } = require("../functions/securityFunctions.js");

const Donor = require("../model/donor.model");

// postman
// // {
// //     "email": "notacopy3@gmail.com",
// //     "password": "1111"
// // }

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await Donor.findOne({ email: email });
    if (!userExists) {
      return res.status(401).json("Please enter correct email and password");
    }

    const correctPassword = await bcrypt.compare(password, userExists.password);
    if (!correctPassword) {
      return res.status(401).json("Please enter correct email and password");
    }

    const token = jwt_token(userExists._id);

    res.send({ token: token });
  } catch (error) {
    console.log("Error logging in: ", error);
    res.status(500).send("Error logging in!");
  }
});

module.exports = router;
