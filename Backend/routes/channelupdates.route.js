import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getAllUserChannelUpdate } from "../controllers/ChannelUpdate.controllers/getAllUserChannelUpdate.controllers.js";
import {makeChannelUpdate} from "../controllers/ChannelUpdate.controllers/makeChannelUpdate.controllers.js";
import {updateChannelUpdate} from "../controllers/ChannelUpdate.controllers/updateChannelUpdate.controllers.js";
import { deleteChannelUpdate } from "../controllers/ChannelUpdate.controllers/deleteChannelUpdate.controllers.js";
const router = Router();

router.get("/", verifyJWT, getAllUserChannelUpdate);
router.post("/", verifyJWT, makeChannelUpdate);
router.patch("/:updateId", verifyJWT, updateChannelUpdate);
router.delete("/:updateId", verifyJWT, deleteChannelUpdate);

console.log("Channel update routes loaded successfully");
export default router;  