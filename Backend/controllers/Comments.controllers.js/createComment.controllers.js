import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import {
    validateDescription,
} from "../../validators/videos.validators.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Comment } from "../../models/comment.model.js";
import { Video } from "../../models/video.model.js";

const createComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    // Validate the video ID
    await validateObjectId(videoId);

    // Check if the video exists
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, 'Video not found');
    }
    video.commentsCount += 1;
    await video.save();
    
    validateDescription(content);
    // Create a new comment
    const comment = await Comment.create({
        video: videoId,
        user: userId,
        content
    });
    await comment.save();
    const createdComment = await Comment.findById(comment._id)
    .populate("user", "username fullname avatar");
    return res.status(201).json(
        new ApiResponse(201, createdComment, "Comment created successfully")
    );
});

export { createComment };