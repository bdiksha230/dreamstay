import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoutes.js"



const app = express()
app.use(cors())  // enable cross orgin resources sharing


// Clerk webhook route must come before express.json()
app.post(
    "/api/clerk",
    express.raw({ type: "application/json" }),
    clerkWebhooks
);

// middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to clerk webhooks
// app.use("/api/clerk", clerkWebhooks)



app.get('/', (req, res) => res.send("API is working  fine"));
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Server running on ${PORT}`));
// Connect database and start server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });

    } catch (error) {
        console.log("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();