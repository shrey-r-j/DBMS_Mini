// routes/bloodBankRoutes.js
const express = require("express");
const router = express.Router();
const BloodBank = require("../models/bloodbank.js");

// CREATE a new blood bank with donations
router.post("/", async (req, res) => {
  try {
    const { bloodBankId, order, deliveryDate, bloodDonations } = req.body;
    
    // Ensure blood donations are provided
    if (!bloodDonations || !Array.isArray(bloodDonations)) {
      return res.status(400).json({ error: "Blood donations must be an array" });
    }

    const bank = new BloodBank({
      bloodBankId,
      order,
      deliveryDate,
      bloodDonations
    });

    await bank.save();
    res.status(201).json(bank);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL blood banks
router.get("/", async (req, res) => {
  try {
    const banks = await BloodBank.find();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a specific blood bank by ID
router.get("/:id", async (req, res) => {
  try {
    const bank = await BloodBank.findById(req.params.id);
    if (!bank) {
      return res.status(404).json({ error: "BloodBank not found" });
    }
    res.json(bank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a blood bank (can update blood donations)
router.put("/:id", async (req, res) => {
  try {
    const { bloodDonations } = req.body;

    if (!bloodDonations || !Array.isArray(bloodDonations)) {
      return res.status(400).json({ error: "Blood donations must be an array" });
    }

    const bank = await BloodBank.findById(req.params.id);
    if (!bank) {
      return res.status(404).json({ error: "BloodBank not found" });
    }

    // Add new blood donations or update existing ones
    bank.bloodDonations.push(...bloodDonations);

    await bank.save();
    res.json(bank);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a blood bank
router.delete("/:id", async (req, res) => {
  try {
    const bank = await BloodBank.findByIdAndDelete(req.params.id);
    if (!bank) {
      return res.status(404).json({ error: "BloodBank not found" });
    }
    res.json({ message: "BloodBank deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
