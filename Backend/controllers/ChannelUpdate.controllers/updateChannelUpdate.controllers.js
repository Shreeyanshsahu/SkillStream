import { ChannelUpdate } from "../../models/channelupdate.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validateRequiredFields, validateObjectId } from "../../validators/validators.js";
const updateChannelUpdate = asyncHandler(async (req, res) => {
    const { update } = req.body;
    const { updateId } = req.params;
    const  channelId  = req.user._id;

    validateObjectId(updateId);
    const channelupdate = await ChannelUpdate.findById(updateId);
    if (!channelupdate) {
        throw new ApiError(404, "Channel update not found");
    }
    if (channelupdate.channel.toString() !== channelId.toString()) {
        throw new ApiError(403, "You are not authorized to update this channel update");
    }
    validateRequiredFields({ update });
    channelupdate.update = update;
    const newUpdate = await channelupdate.save();
    if (!newUpdate) {
        throw new ApiError(400, "Failed to update channel update");
    }
    res.status(200).json(new ApiResponse(200, true, "Channelupdate updated successfully", newUpdate));
});
export { updateChannelUpdate };
