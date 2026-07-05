import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { Video } from '../../models/video.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { User } from '../../models/user.model.js';

const addToWatchHistory = asyncHandler(async (userId, videoId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, 'Video not found');
    }

    // Check if the video is already in the watch history
    const isVideoInHistory = user.watchHistory.some(
        (historyVideo) => historyVideo.toString() === videoId
    );

    if (!isVideoInHistory) {
        user.watchHistory.push(videoId);
        await user.save();
    }
});
const watchVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, 'Video not found');
    }

    // Increment the view count
    video.views += 1;
    await video.save();
    await addToWatchHistory(req.user._id, videoId); // Add to watch history
    return res.status(201).json(
        new ApiResponse(
            200,
            video,
            "Video uploaded successfully"
        )
    );

});

export { watchVideo };