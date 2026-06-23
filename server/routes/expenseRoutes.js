const express = require("express");
const router = express.Router();

const {
    getExpenses,
    createExpense,
    getExpenseById,
    updateExpense,
    deleteExpense,
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");
const { expenseValidator } = require("../middleware/validationMiddleware");

router.use(protect);

router.route("/").get(getExpenses).post(expenseValidator, createExpense);

router
    .route("/:id")
    .get(getExpenseById)
    .put(updateExpense)
    .delete(deleteExpense);

module.exports = router;