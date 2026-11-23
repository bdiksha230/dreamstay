import User from "../models/User";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        // create svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // getting headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestanp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // verify headers
        await whook.verify(JSON.stringyfy(req.body), headers)

        const { data, type } = req.body;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }

        // switch cases for differnt event
        switch (type) {
            case "user.created": {
                await User.create(userData)
                break;
            }
            case "user.update": {
                await User.fideByIdAndUpdate(data.id, userData)
                break;
            }
            case "user.deleted": {
                await User.findByAndDelete(data.id)
                break;
            }
            default:
                break;
        }
        res.json({success: true, message: "Webhook received"})


    } catch (error) {
        console.log(error.message)
        res.json({success: true, message: "Webhook received"});
    }
}

export default clerkWebhooks;