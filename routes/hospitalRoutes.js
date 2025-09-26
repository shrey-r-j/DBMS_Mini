// routes/hospitalRoutes.js
const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital.js");

// CREATE
router.post("/", async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json(hospital);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const hospital = await Hospital.findById(req.params.id);
  if (!hospital) return res.status(404).json({ error: "Hospital not found" });
  res.json(hospital);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(hospital);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Hospital.findByIdAndDelete(req.params.id);
  res.json({ message: "Hospital deleted" });
});

module.exports = router;
