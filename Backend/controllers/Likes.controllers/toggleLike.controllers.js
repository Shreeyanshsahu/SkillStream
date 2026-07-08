import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Likes } from "../../models/likes.model.js";
import { Video } from "../../models/video.model.js";

const toggleLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user._id;
    await validateObjectId(videoId);
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    // Check if the user has already liked the video
    const existingLike = await Likes.findOne({
        user: userId,
        video: videoId
    });

    if (existingLike) {
        // Remove the like
        await Likes.deleteOne({ _id: existingLike._id });

        await Video.findByIdAndUpdate(
            videoId,
            {
                $inc: {
                    likesCount: -1
                }
            }
        );
        return res.status(200).json(new ApiResponse(200, { like: false }, "Like removed successfully"));

    } else {
        // Create a new like
        await Likes.create({
            user: userId,
            video: videoId
        });
        await Video.findByIdAndUpdate(
            videoId,
            {
                $inc: {
                    likesCount: 1
                }
            }
        );
        return res.status(200).json(new ApiResponse(200, { like: true }, "Like added successfully"));
    }
});

export { toggleLike };