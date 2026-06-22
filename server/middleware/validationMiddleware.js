const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
        });
    }
    next();
};

const registerValidator = [
    body("fullName")
        .trim()
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 2, max: 60 }).withMessage("Full name must be 2–60 characters"),
    
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please enter a valid email")
        .normalizeEmail(),
    
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    
    body("confirmPassword")
        .notEmpty().withMessage("Please confirm your password")
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
        }),
    
    validate,
];

const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please enter a valid email")
        .normalizeEmail(),
    
    body("password")
        .notEmpty().withMessage("Password is required"),
    
    validate,
];

const VALID_CATEGORIES = [
  "Food", "Transport", "Shopping", "Entertainment", "Education", "Health", "Other",
];
 
const expenseValidator = [
    body("title")
        .trim()
        .notEmpty().withMessage("Expense title is required")
        .isLength({ max: 100 }).withMessage("Title must not exceed 100 characters"),
    
    body("amount")
        .notEmpty().withMessage("Amount is required")
        .isFloat({ gt: 0 }).withMessage("Amount must be greater than zero"),
    
    body("category")
        .notEmpty().withMessage("Category is required")
        .isIn(VALID_CATEGORIES).withMessage(`Category must be one of: ${VALID_CATEGORIES.join(", ")}`),
    
    body("date")
        .notEmpty().withMessage("Date is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Date must be in YYYY-MM-DD format"),
    
    validate,
];

const budgetValidator = [
    body("budget")
        .notEmpty().withMessage("Budget amount is required")
        .isFloat({ min: 0 }).withMessage("Budget cannot be negative"),
    
    body("budgetMonth")
        .notEmpty().withMessage("Budget month is required")
        .matches(/^\d{4}-\d{2}$/).withMessage("Month must be in YYYY-MM format"),
    
    validate,
];

module.exports = { registerValidator, loginValidator, expenseValidator, budgetValidator, };