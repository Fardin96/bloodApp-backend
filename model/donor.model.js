// import mongoose from "mongoose";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const donorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //   Password: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //   },
    //   bloodGroup: {
    //     type: String,
    //     required: true,
    //     minLength: 2,
    //   },
    //   contact: {
    //     type: Number,
    //     required: true,
    //   },
    //   address: {
    //     type: String,
    //     required: false,
    //   },
    //   dob: {
    //     type: Date,
    //     required: false,
    //   },
    //   recency: {
    //     type: Date,
    //     required: false,
    //   },
    //   nid: {
    //     type: String,
    //     required: false,
    //   },
  },
  {
    timestamps: true,
  }
);

const Donor = mongoose.model("Donor", donorSchema);

// export default Donor;
module.exports = Donor;
