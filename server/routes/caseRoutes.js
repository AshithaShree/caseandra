const express = require("express");
const router = express.Router();
const CaseStudy = require("../models/CaseStudy");

router.get("/", async (req, res) => {
  try {
    const cases = await CaseStudy.find();
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cases" });
  }
});

module.exports = router;