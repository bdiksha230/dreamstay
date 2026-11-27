import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        // Check webhook secret
        if (!process.env.CLERK_WEBHOOK_SECRET) {
            throw new Error("Clerk webhook secret is missing");
        }

        // Create Svix instance
        const whook = new Webhook(
            process.env.CLERK_WEBHOOK_SECRET
        );

        // Get Svix headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verify webhook signature
        const payload = whook.verify(
            req.body.toString(),
            headers
        );

        const { data, type } = payload;

        // Prepare user data
        const primaryEmail = data.email_addresses?.find(
            email => email.id === data.primary_email_address_id
        )?.email_address;

        const userData = {
            _id: data.id,
            email: primaryEmail || data.email_addresses?.[0]?.email_address,
            username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            image: data.image_url,
        };

        // Handle webhook events
        switch (type) {

            case "user.created": {
                await User.create(userData);
                break;
            }

            case "user.updated": {
                await User.findByIdAndUpdate(
                    data.id,
                    userData,
                    { new: true }
                );
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                console.log("Unhandled webhook event:", type);
                break;
        }

        return res.status(200).json({
            success: true,
            message: "Webhook received"
        });

    } catch (error) {
        console.error("Clerk Webhook Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Webhook processing failed"
        });
    }
};

export default clerkWebhooks;















// import User from "../models/User";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//     try {
//         // create svix instance with clerk webhook secret
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         // getting headers
//         const headers = {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"],
//         };

//         // verify headers
//         const payload = whook.verify(req.body.toString(), headers);

//         const { data, type } = payload;

//         const userData = {
//             _id: data.id,
//             email: data.email_addresses[0].email_address,
//             username: data.first_name + " " + data.last_name,
//             image: data.image_url,
//         }

//         // switch cases for differnt event
//         switch (type) {
//             case "user.created": {
//                 await User.create(userData)
//                 break;
//             }
//             case "user.updated": {
//                 await User.findByIdAndUpdate(data.id, userData)
//                 break;
//             }
//             case "user.deleted": {
//                 await User.findByIdAndDelete(data.id)
//                 break;
//             }
//             default:
//                 break;
//         }
//         res.json({ success: true, message: "Webhook received" })


//     } catch (error) {
//         console.log(error.message)
//         res.json({ success: true, message: "Webhook received" });
//     }
// }

// export default clerkWebhooks;