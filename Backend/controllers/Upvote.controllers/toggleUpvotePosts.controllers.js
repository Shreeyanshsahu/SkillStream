import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Upvote } from "../../models/upvote.model.js";
import { ChannelUpdate } from "../../models/channelupdate.model.js";

const toggleUpvotePosts = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    await validateObjectId(postId);
    const channelUpdate = await ChannelUpdate.findById(postId);
    if (!channelUpdate) {
        throw new ApiError(404, "Post not found");
    }
    // Check if the user has already upvoted the post
    const existingUpvote = await Upvote.findOne({
        user: userId,
        post: postId
    });

    if (existingUpvote) {
        // Remove the upvote
        await Upvote.deleteOne({ _id: existingUpvote._id });
        await ChannelUpdate.findByIdAndUpdate(
            postId,
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
            post: postId

        });
        await ChannelUpdate.findByIdAndUpdate(
            postId,
            {
                $inc: {
                    upvoteCount: 1
                }
            }
        );
        return res.status(200).json(new ApiResponse(200, {upvoted: true},"Upvote added successfully"));
    }
});

export { toggleUpvotePosts };