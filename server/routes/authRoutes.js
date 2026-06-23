const express = require("express");
const router = express.Router();

const { register, login, getProfile, logout } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { registerValidator, loginValidator } = require("../middleware/validationMiddleware");

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

router.get("/profile", protect, getProfile);

router.post("/logout", protect, logout);

module.exports = router;