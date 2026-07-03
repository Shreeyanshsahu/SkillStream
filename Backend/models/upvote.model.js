import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Comment } from "./comment.model.js";
import { ChannelUpdate } from "./channelupdate.model.js";
const upvoteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChannelUpdate",
        }
    },
    {
        timestamps: true
    }
)

export const Upvote = mongoose.model("Upvote", upvoteSchema)