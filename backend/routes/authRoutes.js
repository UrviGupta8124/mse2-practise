const express = require("express");
const router = express.Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// ==========================
// 🔹 REGISTER (FIXED)
// ==========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // ❌ DO NOT HASH HERE (schema handles hashing)
    user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ==========================
// 🔹 LOGIN
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;