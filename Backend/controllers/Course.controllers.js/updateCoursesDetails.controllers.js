// update Course details
import {Course} from "../../models/course.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId, validateRequiredFields } from "../../validators/validators.js";

const updateCourseDetails = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  let { coursename, description, visibility } = req.body;
  const userId = req.user._id;

  validateObjectId(courseId);
  let course = await Course.findOne({ _id: courseId, user: userId });
  if (!course) {
    throw new ApiError(404, "Course not found from this user");
  }
  // Update the course details
  if (coursename) {
    validateRequiredFields({ coursename });
    course.coursename = coursename;
  }
  if (description) {
    validateRequiredFields({ description });
    course.description = description;
  }
  if (visibility) {
    if (visibility !== "public" && visibility !== "private") {
      throw new ApiError(400, "Invalid visibility value. It should be either 'public' or 'private'");
    }
    course.visibility = visibility;
  }
  await Course.findOne({
    coursename,
    user: userId,
    _id: { $ne: courseId }
  })
  .then(existingCourse => {
    if (existingCourse) {
      throw new ApiError(400, "Course name already exists for this user");
    }
  });
  const updatedCourse = await course.save();
  res.status(200).json(new ApiResponse(true, "Course details updated successfully", updatedCourse));
});

export { updateCourseDetails };