import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import {
    validateDescription,
} from "../../validators/videos.validators.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Comment } from "../../models/comment.model.js";
import { Video } from "../../models/video.model.js";


const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    await validateObjectId(commentId);
    await validateDescription(content);

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Check if the user is the owner of the comment
    if (comment.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this comment");
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json(new ApiResponse(true, comment, "Comment updated successfully"));
});

export { updateComment };