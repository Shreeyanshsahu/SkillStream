import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Comment } from "../../models/comment.model.js";
import { Video } from "../../models/video.model.js";


const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    await validateObjectId(commentId);

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    // Check if the user is the owner of the comment
    if (comment.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this comment");
    }
    let video = await Video.findById(comment.video);
    if (video) {
        video.commentsCount -= 1;
        await video.save();
    }
    await comment.deleteOne();
    return res.status(200).json(new ApiResponse(true, null, "Comment deleted successfully"));
});

export { deleteComment };
