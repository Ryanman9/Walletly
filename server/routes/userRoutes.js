const express = require("express");
const router = express.Router();

const { updateBudget } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { budgetValidator } = require("../middleware/validationMiddleware");

router.use(protect);

router.put("/budget", budgetValidator, updateBudget);

module.exports = router;