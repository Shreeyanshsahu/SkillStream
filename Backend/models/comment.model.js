import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Video } from "./video.model.js";
const commentSchema = new mongoose.Schema(
    {
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },upvoteCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);
commentSchema.index({
    video:1,
    createdAt:-1
})
export const Comment = mongoose.model("Comment", commentSchema);