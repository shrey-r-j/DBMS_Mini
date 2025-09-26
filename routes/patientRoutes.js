// routes/patientRoutes.js
const express = require("express");
const router = express.Router();
const Patient = require("../models/patient.js");

// CREATE
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const patients = await Patient.find().populate("hospital");
  res.json(patients);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate("hospital");
  if (!patient) return res.status(404).json({ error: "Patient not found" });
  res.json(patient);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(patient);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Patient deleted" });
});

module.exports = router;
