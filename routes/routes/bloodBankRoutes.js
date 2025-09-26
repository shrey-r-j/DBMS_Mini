// routes/bloodBankRoutes.js
const express = require("express");
const router = express.Router();
const BloodBank = require("../models/BloodBank");

// CREATE
router.post("/", async (req, res) => {
  try {
    const bank = new BloodBank(req.body);
    await bank.save();
    res.status(201).json(bank);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const banks = await BloodBank.find();
  res.json(banks);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const bank = await BloodBank.findById(req.params.id);
  if (!bank) return res.status(404).json({ error: "BloodBank not found" });
  res.json(bank);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const bank = await BloodBank.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(bank);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await BloodBank.findByIdAndDelete(req.params.id);
  res.json({ message: "BloodBank deleted" });
});

module.exports = router;
