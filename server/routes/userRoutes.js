const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CaseStudy = require("../models/CaseStudy");

// GET user by ID (with favourites populated)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("favourites");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// TOGGLE favourite
router.post("/:id/favourites", async (req, res) => {
  try {
    const { caseId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.favourites.includes(caseId)) {
      user.favourites.pull(caseId);
    } else {
      user.favourites.push(caseId);
    }

    await user.save();
    const updatedUser = await User.findById(req.params.id).populate("favourites");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating favourites" });
  }
});

module.exports = router;