// import {Webhook} from "svix"
// import User from "../models/User.js"

// //API Controller Function to Manage Clerk User with database

// export const clerkWebhooks=async(req,res)=>{
//   try {
//     const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)
//     await whook.verify(JSON.stringify(req.body),{
//       "svix-id":req.headers["svix-id"],
//       "svix-timestamp":req.headers["svix-timestamp"],
//       "svix-signature":req.headers["svix-signature"],
//     })
//     const {data,type}=req.body;

//    switch (type) {
//     case 'user.created':{
//       const userData={
//         _id:data.id,
//         email:data.email_addresses[0].email_address,
//         name:data.first_name + '' +data.last_name,
//         imageUrl:data.imageUrl,
//       }
//       await User.create(userData)
//       res.json({})
//       break;
//     }

//     case 'user.updated':{
//       const userData={
//         email:data.email_address[0].email_address,
//         name:data.first_name + '' +data.last_name,
//         imageUrl:data.imageUrl,
//       }
//       await User.findByIdAndUpdate(data.id,userData)
//       res.json({})
//       break;
//     }

//     case 'user.deleted':{
//       await User.findByIdAndDelete(data.id)
//       res.json({})
//       break
//     }
   
//     default:
//       break;
//    }


//   } catch (error) {
//     res.json({success:false,message:error.message})
//   }
// }

import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });
        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.imageUrl,
                };
                await User.create(userData);
                res.status(200).json({});
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address, // corrected line
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.imageUrl,
                };
                await User.findByIdAndUpdate(data.id, userData);
                res.status(200).json({});
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.status(200).json({});
                break;
            }

            default:
                res.status(200).json({});//add default response.
                break;
        }
    } catch (error) {
        console.error("Webhook error:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: error.message });
    }
};