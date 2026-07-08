import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Video } from "./video.model.js";
const CourseSchema = new mongoose.Schema(
  {
    coursename: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public"
    }
  },
  { timestamps: true }
);
CourseSchema.index({
    coursename:1,
    user:1
})

export const Course = mongoose.model("Course", CourseSchema);