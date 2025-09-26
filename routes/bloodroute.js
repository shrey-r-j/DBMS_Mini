// routes/bloodRoutes.js
const express = require("express");
const router = express.Router();
const Blood = require("../models/blood.js");

// CREATE
router.post("/", async (req, res) => {
  try {
    const blood = new Blood(req.body);
    await blood.save();
    res.status(201).json(blood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const bloods = await Blood.find().populate("donor");
  res.json(bloods);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const blood = await Blood.findById(req.params.id).populate("donor");
  if (!blood) return res.status(404).json({ error: "Blood not found" });
  res.json(blood);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const blood = await Blood.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blood);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Blood.findByIdAndDelete(req.params.id);
  res.json({ message: "Blood deleted" });
});

module.exports = router;
