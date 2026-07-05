import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Video } from "../../models/Video.model.js";

const searchVideos = asyncHandler(async (req, res) => {

    const { query } = req.query;

    if (!query || query.trim() === "") {
        throw new ApiError(400, "Search query is required");
    }

    const videos = await Video.aggregate([
        {
            $match: {
                $text: {
                    $search: query
                },
                isPublished: true
            }
        },

        {
            $addFields: {
                score: {
                    $meta: "textScore"
                }
            }
        },

        {
            $sort: {
                score: -1
            }
        },

        {
            $limit: 10
        },

        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },

        {
            $unwind: "$owner"
        },

        {
            $project: {
                title: 1,
                thumbnail: 1,
                duration: 1,
                views: 1,
                createdAt: 1,
                videoFile: 1,
                owner: {
                    _id: "$owner._id",
                    username: "$owner.username",
                    avatar: "$owner.avatar",
                    fullName: "$owner.fullName"
                }
            }
        }

    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Videos fetched successfully"
        )
    );

});

export { searchVideos };