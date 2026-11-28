import User from '../models/User.js'


//middleware to check if user is authenticated

export const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth 

        // Check if user is authenticated
        if (!userId) {
             res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        // Find user in MongoDB
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// middleware to check if user is authenticated
// export const protect = async (req, res, next) => {
//     const { userId } = req.auth;
//     if (userId) {
//         res.json({ success: false, message: "not authenticated" })
//     } else {
//         const user = await User.findById(userId)
//         req.user = user;
//         next()
//     }
// }