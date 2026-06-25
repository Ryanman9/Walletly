const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

const connectDB = async ()=> {
    try {
        console.log(process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn.connection.host}`);

        mongoose.connection.on("error", (err) => {
            console.error(`MongoDB connection error: ${err.message}`);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected. Attempting to reconnect...");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB reconnected");
        });
    } catch (error) {
        console.error(`MongoDB connection failder: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;