// models/BloodBank.js
const mongoose = require("mongoose");

const bloodDonationSchema = new mongoose.Schema({
  bloodType: { type: String, required: true },
  quantity: { type: Number, required: true }, // Quantity in milliliters or units
  donationDate: { type: Date, default: Date.now }, // Date when blood was donated
});

const bloodBankSchema = new mongoose.Schema({
  bloodBankId: { type: String, required: true, unique: true },
  order: String,
  deliveryDate: Date,
  bloodDonations: [bloodDonationSchema], // Array to hold blood donations
});

module.exports = mongoose.model("BloodBank", bloodBankSchema);
