const Expense = require("../models/Expense");

const getExpenses = async (req, res, next) => {
    try{
        const{category, month, search} = req.query;

        const filter = { user: req.user._id };

        if(category && category !== "All") {
            filter.category = category;
        }

        if(month){
            filter.date = {$regex: `^${month}`};
        }

        if(search){
            filter.title = {$regex: search.trim(), $options: "i"};
        }

        const expenses = await Expense.find(filter).sort({date: -1, createdAt: -1});

        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses,
        });
    }
    catch(error){
        next(error);
    }
};

const createExpense = async (req, res, next) => {
    try {
        const { title, amount, category, date } = req.body;
    
        const expense = await Expense.create({
            user: req.user._id,
            title,
            amount: Number(amount),
            category,
            date,
        });
    
        res.status(201).json({
            success: true,
            message: "Expense added successfully.",
            expense,
        });
    } catch (error) {
        next(error);
    }
};

const getExpenseById = async (req, res, next) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user._id,
        });
    
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found.",
            });
        }
    
        res.status(200).json({ success: true, expense });
    } catch (error) {
        next(error);
    }
};

const updateExpense = async (req, res, next) => {
    try {
        const { title, amount, category, date } = req.body;
    
        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                ...(title !== undefined && { title }),
                ...(amount !== undefined && { amount: Number(amount) }),
                ...(category !== undefined && { category }),
                ...(date !== undefined && { date }),
            },
            { new: true, runValidators: true }
        );
    
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found.",
            });
        }
    
        res.status(200).json({
            success: true,
            message: "Expense updated successfully.",
            expense,
        });
    } catch (error) {
        next(error);
    }
};

const deleteExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });
    
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found.",
            });
        }
    
        res.status(200).json({
            success: true,
            message: "Expense deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};