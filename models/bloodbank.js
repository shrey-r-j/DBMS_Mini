// models/BloodBank.js
const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema({
  bloodBankId: { type: String, required: true, unique: true },
  order: String,
  deliveryDate: Date
});

module.exports = mongoose.model("BloodBank", bloodBankSchema);
