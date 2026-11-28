
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
 
// import userRouter from "./routes/userRoutes.js";

connectDB()
const app = express();

app.use(cors());

// Other middlewares
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhooks)

// Connect MongoDB before processing API requests
// app.use(async (req, res, next) => {
//     try {
//         await connectDB();
//         next();
//     } catch (error) {
//         console.error("Database connection failed:", error.message);
//         res.status(500).json({
//             success: false,
//             message: "Database connection failed"
//         });
//     }
// });

// Clerk webhook must come before express.json()
// app.post(
//     "/api/clerk",
//     express.raw({ type: "application/json" }),
//     clerkWebhooks
// );



// API routes
app.get('/', (req, res) => {
    res.send("API is working fine");
});

// app.use("/api/user", userRouter);

// Local server only
 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
        console.log(`Server running  on ${PORT}`);
    });


// Export for Vercel
export default app;
