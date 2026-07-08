import { ChannelUpdate } from "../../models/channelupdate.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validateObjectId } from "../../validators/validators.js";
const deleteChannelUpdate = asyncHandler(async (req, res) => {
  const { updateId } = req.params;
  validateObjectId(updateId);
  const channelId  = req.user._id;   
  const channelupdate = await ChannelUpdate.findOne({ _id: updateId, channel: channelId });
  if (!channelupdate) {
    throw new ApiError(404, "Channel update not found or you are not authorized to delete it");
  }
  const deletedUpdate = await ChannelUpdate.findByIdAndDelete(updateId);
  if (!deletedUpdate) {
    throw new ApiError(404, "Channel update not found");
  }
  res.status(200).json(new ApiResponse(200, true, "Channel update deleted successfully", deletedUpdate));
});

export { deleteChannelUpdate };