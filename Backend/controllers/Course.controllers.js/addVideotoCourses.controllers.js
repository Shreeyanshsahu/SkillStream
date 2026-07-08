// add video to Course

import {Course} from "../../models/course.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import {Video} from "../../models/video.model.js";

const addVideoToCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { videoId } = req.params;
  const userId = req.user._id;
  
  validateObjectId(courseId);
  validateObjectId(videoId);
  let course = await Course.findOne({ _id: courseId, user: userId });
  if (!course) {
    throw new ApiError(404, "Course not found or you are not authorized to add videos to it");
  } 

  // Check if the video exists
    const video = await Video.findById(videoId);
    if (!video) {
      throw new ApiError(404, "Video not found");
    }

  // Check if the video is already added to the course
  if (course.videos.some(id => id.equals(videoId))) {
    throw new ApiError(400, "Video already added to the course");
  }
  if(video.owner.toString() !== userId.toString()){
    throw new ApiError(403, "You are not authorized to add this video to the course");
  }
  // Add the video to the course
  course.videos.push(videoId);
  await course.save();

  res.status(200).json(new ApiResponse(true, "Video added to course successfully"));
});

export { addVideoToCourse };