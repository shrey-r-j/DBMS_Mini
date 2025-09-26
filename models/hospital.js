// models/Hospital.js
const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospitalName: String,
  address: String,
  contactNo: String,
  orderStatus: String
});

module.exports = mongoose.model("Hospital", hospitalSchema);
