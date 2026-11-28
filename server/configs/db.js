import mongoose from "mongoose"
import dns from 'node:dns'

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Database connected")
        })
        await mongoose.connect(`${process.env.MONGODB_URL}/dreamstay`)

    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
};

export default connectDB;