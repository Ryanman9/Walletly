const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");

const register = async (req, res, next) => {
    try{
        const{fullName, email, password} = req.body;

        const existing = await User.findOne({email});
        if(existing){
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        const user = await User.create({fullName, email, password});

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                budget: user.budget,
                budgetMonth: user.budgetMonth,
                createdAt: user.createdAt,
            },
        });
    }
    catch(error){
        next(error);
    }
};

const login = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                budget: user.budget,
                budgetMonth: user.budgetMonth,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res) => {

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};
 
module.exports = { register, login, getProfile, logout };