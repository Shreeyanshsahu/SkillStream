import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Video } from "./video.model.js";
const likesSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            required: true
        }
    },
    {
        timestamps: true
    }
)

likesSchema.index(
{
    user:1,
    video:1
},
{
    unique:true
})
export const Likes = mongoose.model("Likes", likesSchema)