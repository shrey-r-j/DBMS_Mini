// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const Employee = require("../models/bloodbankemployee.js");

// CREATE
router.post("/", async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const emps = await Employee.find().populate("bloodBank");
  res.json(emps);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const emp = await Employee.findById(req.params.id).populate("bloodBank");
  if (!emp) return res.status(404).json({ error: "Employee not found" });
  res.json(emp);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
});

module.exports = router;
