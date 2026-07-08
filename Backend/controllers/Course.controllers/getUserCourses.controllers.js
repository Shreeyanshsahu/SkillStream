//get user courses

import { Course } from "../../models/course.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
const getUserCourses = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const courses = await Course.find({ user: userId }).populate("user", "username fullname avatar");
    if (!courses || courses.length === 0) {
        return res.send(new ApiResponse(200, "No courses found for this user", []));
    }

    res.status(200).json(new ApiResponse(200, "User courses retrieved successfully", courses));
});

export { getUserCourses };