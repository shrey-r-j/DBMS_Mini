// models/Donor.js
const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  donorId: { type: String, required: true, unique: true },
  name: String,
  dob: Date,
  age: Number,
  address: String,
  contactNo: String,
  diseases: [String],
  lastDonationDate: Date,
  donationStatus: { type: String, enum: ["Eligible", "Not Eligible"] }
});

module.exports = mongoose.model("Donor", donorSchema);
