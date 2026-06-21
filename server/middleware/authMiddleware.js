const { verifyToken } = require("../utils/generateToken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Not authorized. No token provided.",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);

        const user = await User.findById(decoded.id).select("-password");

        if(!user) {
            return res.status(401).json ({
                success: false,
                message: "Not authorized. User no longer exists.",
            });
        }

        req.user = user;
        next();
    }
    catch(error){
        if(error.name === "JsonWebTokenError") {
            return res.status(401).json ({
                success: false,
                message: "Not authorized. Invalid token.",
            });
        }

        if(error.name === "TokenExpiredError"){
            return res.status(401).json({
                success: false,
                message: "Not authorized. Token has expired. Please log in again",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error during authentication.",
        });
    }
};

module.exports = { protect };