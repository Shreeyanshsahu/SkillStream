import { User } from '../../models/user.model.js';
import { Video } from '../../models/video.model.js';
import { Course } from '../../models/course.model.js';
import { Subscription } from '../../models/subscription.model.js';
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getUserDashboard = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const thirtyDaysAgo = new Date(
        Date.now() - 30 * 24 * 60 * 60 * 1000
    );
    const channelstats = await User.aggregate([
        { $match: { _id: userId } },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $addFields: {
                subscribersCount: { $size: "$subscribers" },
                subscribergainedinlast30days: {
                    $size: {
                        $filter: {
                            input: "$subscribers",
                            as: "subscriber",
                            cond: {
                                $gte: ["$$subscriber.createdAt", thirtyDaysAgo]
                            }
                        }
                    }
                },
            }
        }, {
            $project: {
                username: 1,
                avatar: 1,
                coverimage: 1,
                subscribersCount: 1,
                subscribergainedinlast30days: 1,
            }
        }
    ]);
    const videostats= await Video.aggregate([
        {
            $match: {
                owner: userId,
                isPublished: true
            }
        },
        {
            $group: {
                _id: null,
                totalViews: { $sum: "$views" },
                totalVideos: { $sum: 1 },
                totalLikes: { $sum: "$likescount" },
                totalComments: { $sum: "$commentscount" },
                avgLikesPerVideo: { $avg: "$likescount" },
                avgCommentsPerVideo: { $avg: "$commentscount" },
                avgDuration: { $avg: "$duration" },
                maxviews: { $max: "$views" },
                maxlikes: { $max: "$likescount" },
                maxcomments: { $max: "$commentscount" },
            }
        }
    ]);



    res.status(200).json(new ApiResponse(true, "User dashboard fetched successfully", {
        channel: channelstats[0],
        videostats: videostats[0] || {
            totalViews: 0,
            totalVideos: 0,
            totalLikes: 0,
            totalComments: 0,
            avgLikesPerVideo: 0,
            avgCommentsPerVideo: 0,
            avgDuration: 0,
            maxviews: 0,
            maxlikes: 0,
            maxcomments: 0
        }
    }));
});

const getRecentactivity = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const [recentVideos,recentCourses,recentComments] = await Promise.all([
        Video.find({ owner: userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title videoFile views likescount commentscount createdAt")
            .lean(),

     Course.find({ user : userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("coursename videos description createdAt")
        .lean(),
    
    Comment.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("content video createdAt")
        .populate("video", "title")
        .lean()]);
    
    res.status(200).json(new ApiResponse(200,true, "Recent activity fetched successfully", {
        recentVideos,
        recentCourses,
        recentComments
    }));
});

const topVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const topVideos = await Video.aggregate([
        { $match: { owner: userId, isPublished: true } },
        { $sort: { views: -1 } },
        { $limit: 5 },
        {
            $project: {
                title: 1,
                views: 1,
                videoFile: 1,
                likescount: 1,
                commentscount: 1,
                createdAt: 1
            }
        }
    ]);
    
    res.status(200).json(new ApiResponse(200,true, "Top videos fetched successfully", {
        topVideos
    }));
});

export { getUserDashboard, getRecentactivity, topVideos };

