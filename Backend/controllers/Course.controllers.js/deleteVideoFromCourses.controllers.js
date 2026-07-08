//Delete videos from course
import { Course } from "../../models/course.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";

const deleteVideoFromCourse = asyncHandler(async (req, res) => {
    const { courseId, videoId } = req.params;
    const userId = req.user._id;
    // Validate courseId and videoId
    validateObjectId(courseId);
    validateObjectId(videoId);
    // Find the course by ID
    const course = await Course.findOne({
        _id: courseId,
        user: userId
    });
    if (!course) {
        throw new ApiError(404, "Course not found or you are not authorized to delete videos from it");
    }
    //check if video exists in the course
    if (!course.videos.some(id => id.equals(videoId))) {
        throw new ApiError(404, "Video not found in the course");
    }
    course.videos.pull(videoId); // Remove the video ID from the course's videos array

    // Save the updated course
    let updatedCourse = await course.save();

    // Optionally, you can also delete the video document itself if needed
    res.status(200).json(new ApiResponse(200, "Video deleted from course successfully", updatedCourse.videos));
});

export { deleteVideoFromCourse };