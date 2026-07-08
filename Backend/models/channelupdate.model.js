import mongoose from "mongoose";
import { User } from "./user.model.js";
const channelUpdateSchema = new mongoose.Schema(
    {
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        update: {
            type: String,
            required: true
        },upvoteCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

channelUpdateSchema.index({
    channel:1,
    createdAt:-1
})
export const ChannelUpdate = mongoose.model("ChannelUpdate", channelUpdateSchema)