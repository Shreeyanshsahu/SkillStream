//DeleteCourse
import {Course} from "../../models/course.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;
  validateObjectId(courseId);
  // Find the course by ID and user ID
  const course = await Course.findOne({ _id: courseId, user: userId });

  if (!course) {
    throw new ApiError(404, "Course not found or you are not authorized to delete it");
  }

  // Delete the course
  await Course.deleteOne({ _id: courseId });

  res.status(200).json(new ApiResponse(true, "Course deleted successfully"));
});

export { deleteCourse };