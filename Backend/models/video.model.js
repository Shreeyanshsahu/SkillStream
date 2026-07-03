import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Category } from "./category.model.js";
import { User } from "./user.model.js";
const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },
        title: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },duration: {
            type: Number,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },tags: {
            type: [String],
            default: []
        },
        views: {
            type: Number,
            default: 0
        },visibility: {
            type: String,
            enum: ["public", "private", "unlisted"],
            default: "public"
        },isPublished: {
            type: Boolean,
            default: false
        },likescount: {
            type: Number,
            default: 0
        },commentscount: {
            type: Number,
            default: 0
        }
    },{
        timestamps: true
    }
)
videoSchema.index({
    owner:1
})
videoSchema.index({
    title:"text",
    description:"text"
})
videoSchema.index({
    category:1
})
videoSchema.index({
    views:-1
})
videoSchema.plugin(mongoosePaginate);

export const Video = mongoose.model("Video", videoSchema)