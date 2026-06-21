const mongoose = require("mongoose");

const CATEGORIES = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Education",
    "Health",
    "Other",
]

const expenseSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: [true, "Expense title is required"],
            trim: true,
            minlength: [1, "Title cannot be empty"],
            maxlength: [100, "Title must not exceed 100 characters"],
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [0.01, "Amount must be greater than zero"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: {
                values: CATEGORIES,
                message: `Category must be one of: ${CATEGORIES.join(", ")}`,
            },
            default: "Other",
        },
        date: {
            type: String,
            required: [true, "Date is required"],
            match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"],
        },
    },
    {
        timestamps: true,
    }
);

expenseSchema.index({ user: 1, date: -1});

expenseSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
    },
});

module.exports = mongoose.model("Expense", expenseSchema)