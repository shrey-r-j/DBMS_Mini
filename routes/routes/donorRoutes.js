// routes/donorRoutes.js
const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");

// CREATE
router.post("/", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const donor = await Donor.findById(req.params.id);
  if (!donor) return res.status(404).json({ error: "Donor not found" });
  res.json(donor);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(donor);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Donor.findByIdAndDelete(req.params.id);
  res.json({ message: "Donor deleted" });
});

module.exports = router;
