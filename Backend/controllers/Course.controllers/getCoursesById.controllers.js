//easy search by course id only
//get courses by searching by title and description

import { Course } from "../../models/course.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";

const getCoursesById = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    // Validate the courseId
    validateObjectId(courseId);
    const course = await Course.findById(courseId).populate("user", "username fullname avatar").populate(
        "videos",
        "title thumbnail duration views"
    );
    if (!course) {
        throw new ApiError(404, "Course not found");
    }
    if (
        course.visibility === "private" &&
        course.user._id.toString() !== req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "This course is private."
        );
    }

    res.status(200).json(new ApiResponse(200, "Course retrieved successfully", course));
});

export { getCoursesById };