// import mongoose from "mongoose";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const donorSchema = new Schema(
  {
    donorName: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const Donor = mongoose.model("Donor", donorSchema);

// export default Donor;
module.exports = Donor;
