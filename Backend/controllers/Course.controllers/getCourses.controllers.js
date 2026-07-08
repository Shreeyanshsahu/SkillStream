//get courses by searching by title and description

import { Course } from "../../models/course.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import { User } from "../../models/user.model.js";

const getCourses = asyncHandler(async (req, res) => {
    const { search } = req.query;

    let query = {
        visibility: "public",
    };
    if (search) {
        query.$or = [
            { coursename: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }   

    const courses = await Course.find(query).populate("user", "username fullname avatar");
    if (!courses || courses.length === 0) {
        return res.send(new ApiResponse(200, "No courses found", []));
    }

    res.status(200).json(new ApiResponse(200, "Courses retrieved successfully", courses));
});

export { getCourses };