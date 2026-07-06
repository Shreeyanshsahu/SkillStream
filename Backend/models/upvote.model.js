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
upvoteSchema.index(
    { user: 1, comment: 1 },
    { unique: true, partialFilterExpression: { comment: { $exists: true } } }
);

upvoteSchema.index(
    { user: 1, post: 1 },
    { unique: true, partialFilterExpression: { post: { $exists: true } } }
);
export const Upvote = mongoose.model("Upvote", upvoteSchema)