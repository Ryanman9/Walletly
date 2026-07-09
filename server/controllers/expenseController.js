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

const getAnalytics = async (req, res, next) => {
    try{
        const userId = req.user._id;
        const {month} = req.query;

        const targetMonth =  /^\d{4}-\d{2}$/.test(month || "") ? month : new Date().toISOString().slice(0,7);

        const categoryAgg = await Expense.aggregate([
            {$match: {user: userId, date: {$regex: `^${targetMonth}`}}},
            {$group: {_id: "$category", total: {$sum: "$amount"}, count: {$sum: 1}}},
            {$sort: {total: -1}},
        ]);

        const totalSpent = categoryAgg.reduce((sum, c) => sum + c.total, 0);
        const transactionCount = categoryAgg.reduce((sum, c) => sum+ c.count, 0);


        const [y, m] = targetMonth.split("-").map(Number);
        const prevDate = new Date(y, m-2, 1);
        const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth()+1).padStart(2, "0")}`;

        const prevAgg = await Expense.aggregate([
            {$match: {user: userId, date: {$regex: `^${prevMonth}`}}},
            {$group: {_id: null, total: {$sum: "$amount"}}},
        ]);

        const previousMonthTotal = prevAgg[0]?.total || 0;
        const percentChange = previousMonthTotal > 0
            ? ((totalSpent - previousMonthTotal) / previousMonthTotal) * 100
            : null;

        const monthLabels = [];
        for (let i=5; i>=0; i--){
            const d = new Date(y,m-1-i, 1);
            monthLabels.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
        }

        const trendAgg = await Expense.aggregate([
            {$match: {user: userId, date: {$gte: `${monthLabels[0]}-01`}}},
            {
                $group: {
                    _id: { $substrCP: ["$date", 0, 7] },
                    total: { $sum: "$amount" },
                },
            },
        ]);

        const trendMap = new Map(trendAgg.map((t) => [t._id, t.total]));
        const monthlyTrend = monthLabels.map((mo) => ({
            month: mo,
            total: trendMap.get(mo) || 0,
        }));

        const dailyAgg = await Expense.aggregate([
            { $match: { user: userId, date: { $regex: `^${targetMonth}` } } },
            { $group: { _id: "$date", total: { $sum: "$amount" } } },
            { $sort: { _id: 1 } },
        ]);


        res.status(200).json({
            success: true,
            month: targetMonth,
            summary: {
                totalSpent,
                transactionCount,
                avgTransaction: transactionCount ? Math.round(totalSpent / transactionCount) : 0,
                topCategory: categoryAgg[0]?._id || null,
                previousMonthTotal,
                percentChange,
            },
            categoryBreakdown: categoryAgg.map((c) => ({
                category: c._id,
                total: c.total,
                count: c.count,
            })),
            monthlyTrend,
            dailyTrend: dailyAgg.map((d) => ({ date: d._id, total: d.total })),
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getAnalytics,
};