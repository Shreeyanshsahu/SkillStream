import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Likes } from "../../models/likes.model.js";
import { Video } from "../../models/video.model.js";

const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {
        page = 1,
        limit = 10
    } = req.query;
    // Find all likes for the user and populate the video details
    const currentPage = Math.max(Number(page), 1);
    const currentLimit = Math.min(Math.max(Number(limit), 1), 50);
    const likedVideos = await Likes.aggregate([
        { $match: { user: userId } },
        {
            $sort: { createdAt: -1 }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "videos"
            }
        },
        { $unwind: "$videos" },
        {
            $skip: (currentPage - 1) * currentLimit
        },
        {
            $limit: currentLimit
        }, {
            $project: {
                _id: 0,
                video: "$videos"
            }
        },
    ]);

    return res.status(200).json(new ApiResponse(200, { likedVideos
        , currentPage, currentLimit
    }, "Liked videos fetched successfully"));
});

export { getLikedVideos };