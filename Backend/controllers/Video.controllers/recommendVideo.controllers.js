import mongoose from "mongoose";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

import { Video } from "../../models/Video.model.js";

const getRecommendedVideos = asyncHandler(async (req, res) => {

    const {
        videoId,
        page = 1,
        limit = 10
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const currentLimit = Math.max(Number(limit), 1);

    const pipeline = [];

    let currentVideo = null;

    // Watch Page
    if (videoId) {

        if (!mongoose.isValidObjectId(videoId)) {
            throw new ApiError(400, "Invalid video id");
        }

        currentVideo = await Video.findById(videoId);

        if (!currentVideo) {
            throw new ApiError(404, "Video not found");
        }

        pipeline.push({
            $match: {
                category: currentVideo.category,
                isPublished: true,
                _id: {
                    $ne: currentVideo._id
                }
            }
        });

    } else {

        // Homepage
        pipeline.push({
            $match: {
                isPublished: true
            }
        });

    }

    pipeline.push(

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
            $addFields: {

                recommendationScore: {

                    $add: [

                        "$views",

                        {
                            $multiply: [
                                "$likesCount",
                                3
                            ]
                        },

                        {
                            $multiply: [
                                "$commentsCount",
                                2
                            ]
                        },

                        {
                            $multiply: [
                                "$owner.subscribers",
                                5
                            ]
                        }

                    ]

                }

            }
        },

        {
            $sort: {
                recommendationScore: -1,
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
            $project: {

                title: 1,

                thumbnail: 1,

                duration: 1,

                views: 1,

                likesCount: 1,

                commentsCount: 1,

                recommendationScore: 1,

                createdAt: 1,

                owner: {

                    _id: "$owner._id",

                    username: "$owner.username",

                    fullName: "$owner.fullName",

                    avatar: "$owner.avatar",

                    subscribers: "$owner.subscribers"

                }

            }
        }

    );

    const videos = await Video.aggregate(pipeline);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                videos,
                "Recommended videos fetched successfully"
            )
        );

});

export { getRecommendedVideos };