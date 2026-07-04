import { Video } from "../models/video.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import validateObjectId from "../validators/validators.js";
// PATCH  /videos/:videoId
// DELETE /videos/:videoId
// PATCH  /videos/:videoId/publish
// these routes are only accessible to the owner of the video thats 
// why we need this middleware to check if the user is the owner of the video or not
// jwt verify will be already done in the auth middleware 
// so we can access the userId from req.userId

export const isVideoOwner = asyncHandler(async (req, res, next) => {
    const videoId = req.params.videoId;
    
    const userId = req.user._id.toString(); // Assuming req.user is populated by the auth middleware

    validateObjectId(videoId);

    const video = await Video.findById(videoId).select("owner");

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== userId) {
        throw new ApiError(403, "You are not the owner of this video");
    }
    
    next();
});