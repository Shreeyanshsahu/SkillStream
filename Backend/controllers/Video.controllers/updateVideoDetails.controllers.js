import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import {
    validateUpdate,
} from "../../validators/videos.validators.js";
const updateVideoDetails = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description, tags } = req.body;
    const userId = req.user.id; // Assuming you have user authentication and the user ID is available in req.user
    // Validate the video ID
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, 'Video not found');
    }
    if (!validateObjectId(videoId)) {
        throw new ApiError(400, 'Invalid video ID');
    }
    if(userId !== video.owner.toString()) {
        throw new ApiError(403, "You are not authorized to update this video");
    }
    // Validate the input data
    if (!title && !description && !tags) {
        throw new ApiError(400, 'At least one field (title, description, or tags) must be provided for update');
    }
    const updateError = await validateUpdate({ title, description, tags });

    if (updateError) {
        throw new ApiError(400, 'Validation errors', {
            update: updateError
        });
    }

    // Update the video details
    video.title = title || video.title;
    video.description = description || video.description;
    video.tags = tags || video.tags;
    video.updatedAt = Date.now();

    await video.save();
    return res.status(200).json(
        new ApiResponse(200, video, "Video details updated successfully"))
}
);


export { updateVideoDetails };