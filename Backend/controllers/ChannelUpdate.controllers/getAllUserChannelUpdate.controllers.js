import { ChannelUpdate } from "../../models/channelupdate.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validateRequiredFields } from "../../validators/validators.js";

const getAllUserChannelUpdate = asyncHandler(async (req, res) => {
  const channelId  = req.user._id;   
  const channelUpdates = await ChannelUpdate.find({ channel: channelId });
    if (channelUpdates.length === 0) {
      return res.status(200).json(new ApiResponse(200, true, "No channel updates found", []));
    }
    res.status(200).json(new ApiResponse(200, true, "Channel updates fetched successfully", channelUpdates));
});
export { getAllUserChannelUpdate };
