const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./Routes/auth.Routes");
require("dotenv").config();

const app = express();

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Database connected");

        app.use(express.json())
        app.use("/api/auth", authRouter);

        app.listen(3000, () => {
            console.log("🚀 Server is listening on PORT 3000");
        });

        app.use((err, req, res, next) => {
            const statusCode = err.statusCode ?? 500;
            const message = err.message || "Something Went Wrong"
            return res.status(statusCode).json({
                success: false,
                statusCode,
                message
            })
        })
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

startServer();
