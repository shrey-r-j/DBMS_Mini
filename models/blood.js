// models/Blood.js
const mongoose = require("mongoose");

const bloodSchema = new mongoose.Schema({
  bloodId: { type: String, required: true, unique: true },
  bloodGroup: String,
  cost: Number,
  storedDate: Date,
  expiryDate: Date,
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" }
});

module.exports = mongoose.model("Blood", bloodSchema);
