require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: [
        process.env.CLIENT_URL || "http://localhost:5173",
        "http://localhost:3000",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests from this IP. Please try again in 15 minutes.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api", limiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        message: "Too many auth attempts. Please wait 15 minutes before trying again.",
    },
});
app.use("/api/auth", authLimiter);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Walletly API is running",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Walletly API running on http://localhost:${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err) => {
    console.error(`❌ Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
    console.error(`❌ Uncaught Exception: ${err.message}`);
    process.exit(1);
});