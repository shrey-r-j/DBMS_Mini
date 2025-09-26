// models/Patient.js
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  name: String,
  dob: Date,
  bloodGroup: String,
  contactNo: String,
  borrowDate: Date,
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }
});

module.exports = mongoose.model("Patient", patientSchema);
