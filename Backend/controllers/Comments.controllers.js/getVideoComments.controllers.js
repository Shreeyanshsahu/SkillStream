import { ApiError } from "../../utils/ApiError.js";
import { validateObjectId } from "../../validators/validators.js";
import {
    validateDescription,
} from "../../validators/videos.validators.js";
import mongoose from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Comment } from "../../models/comment.model.js";
import { Video } from "../../models/video.model.js";


const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const {
        page = 1,
        limit = 10
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const currentLimit = Math.min(Math.max(Number(limit),1),50);

    await validateObjectId(videoId);
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const comments = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: (currentPage - 1) * currentLimit
        },
        {
            $limit: currentLimit
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: 1,
                content: 1,
                createdAt: 1,
                updatedAt: 1,
                user: {
                    _id: "$user._id",
                    username: "$user.username",
                    fullname: "$user.fullname",
                    avatar: "$user.avatar"
                }
            }
        }
    ]);

    const totalComments = await Comment.countDocuments({
        video: videoId
    });

    const totalPages = Math.ceil(totalComments / currentLimit);

    return res.status(200).json(
        new ApiResponse(200, {
            comments,
            pagination: {
                totalComments,
                totalPages,
                currentPage,
                currentLimit
            }
        }, "Comments fetched successfully")
    );
});

export { getVideoComments };