import { ChannelUpdate } from "../../models/channelupdate.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validateRequiredFields } from "../../validators/validators.js";
const makeChannelUpdate = asyncHandler(async (req, res) => {
  const { update } = req.body;
  const channelId  = req.user._id;
  validateRequiredFields({ update });
    const newUpdate = await ChannelUpdate.create({
      update,
      channel: channelId,
    });
    if (!newUpdate) {
      throw new ApiError(400, "Failed to create channel update");
    }
    res.status(201).json(new ApiResponse(201, true, "Channel update created successfully", newUpdate));
});
export { makeChannelUpdate };
