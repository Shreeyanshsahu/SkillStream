//Create course
import {Course} from "../../models/course.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import {validateObjectId, validateRequiredFields} from "../../validators/validators.js";
const createCourse = asyncHandler(async (req, res) => {
  let { coursename, description, visibility } = req.body;
  const userId = req.user._id;

  validateRequiredFields({ coursename, description});
  // Check if the course name already exists for the user
  const existingCourse = await Course.findOne({ coursename, user: userId });
  if (existingCourse) {
    throw new ApiError(400, "Course name already exists for this user");
  }
  if(!visibility){
    visibility = "public"
  }
  if (visibility !== "public" && visibility !== "private") {
    throw new ApiError(400, "Invalid visibility value. It should be either 'public' or 'private'");
  }
  const newCourse = await Course.create({
    coursename,
    description,
    visibility,
    user: userId,
  });
  res.status(201).json(new ApiResponse(true, "Course created successfully", newCourse));
});

export { createCourse };