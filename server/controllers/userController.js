const User = require("../models/User");

const updateBudget = async (req, res, next) => {
    try{
        const {budget, budgetMonth} = req.body;
        
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {budget: Number(budget), budgetMonth},
            {new: true, runValidators: true}
        );

        res.staus(200).json ({
            success: true,
            message: "Budget updated successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                budget: user.budget,
                budgetMonth: user.budgetMonth,
            },
        });
    } catch(error){
        next(error);
    }
};

module.exports = { updateBudget };