import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Upvote } from "../../models/upvote.model.js";
import { Comment } from "../../models/comment.model.js";

const toggleUpvoteComments = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;
    await validateObjectId(commentId);
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    // Check if the user has already upvoted the comment
    const existingUpvote = await Upvote.findOne({
        user: userId,
        comment: commentId
    });

    if (existingUpvote) {
        // Remove the upvote
        await Upvote.deleteOne({ _id: existingUpvote._id });
        await Comment.findByIdAndUpdate(
            commentId,
            {
                $inc: {
                    upvoteCount: -1
                }
            }
        );
        return res.status(200).json(new ApiResponse(200, {upvoted: false}, "Upvote removed successfully"));

    } else {
        // Create a new upvote
        await Upvote.create({
            user: userId,
            comment: commentId
        });
        await Comment.findByIdAndUpdate(
            commentId,
            {
                $inc: {
                    upvoteCount: 1
                }
            }
        );
        return res.status(200).json(new ApiResponse(200, {upvoted: true},"Upvote added successfully"));
    }
});

export { toggleUpvoteComments };