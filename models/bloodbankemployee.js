// models/BloodBankEmployee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: String,
  contactNo: String,
  bloodBank: { type: mongoose.Schema.Types.ObjectId, ref: "BloodBank" },
    // bloodBank: { type: String }   // <-- store string like "1"

});

module.exports = mongoose.model("BloodBankEmployee", employeeSchema);
