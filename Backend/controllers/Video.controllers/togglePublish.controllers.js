import {Video} from "../../models/video.model.js";
import {User} from "../../models/user.model.js";
import {Category} from "../../models/category.model.js";
import {ApiError} from "../../utils/ApiError.js";
import {ApiResponse} from "../../utils/ApiResponse.js";
export const togglePublish = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        // Find the video by ID and ensure it belongs to the authenticated user
        const video = await Video.findOne({ _id: videoId, owner: userId });
        if (!video) {
            throw new ApiError(404, 'Video not found or you do not have permission to modify it.');
        }
        // Toggle the published status
        video.isPublished = !video.isPublished;
        video.visibility = video.isPublished ? 'public' : 'private';
        await video.save();

        res.status(200).json(new ApiResponse(200, { isPublished: video.isPublished }, 'Video publish status updated successfully.'));
    } catch (error) {
        console.error('Error toggling video publish status:', error);
        res.status(500).json(new ApiResponse(500, null, 'An error occurred while toggling the video publish status.'));
    }
}