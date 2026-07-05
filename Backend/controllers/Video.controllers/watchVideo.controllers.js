import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { Video } from '../../models/Video.model.js';
import { ApiError } from '../../utils/ApiError.js';

const watchVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, 'Video not found');
    }

    // Increment the view count
    video.views += 1;
    await video.save();

    return res.status(201).json(
        new ApiResponse(
            200,
            video,
            "Video uploaded successfully"
        )
    );
});

export { watchVideo };