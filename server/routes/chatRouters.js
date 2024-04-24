import express from 'express'
import {getChat, sendChat} from "../controllers/chatController.js"
import {protectRoute} from "../middlewares/authMiddlewave.js"


const router = express.Router();

router.post("/send/:id",protectRoute, sendChat)

router.get("/:id",protectRoute, getChat)

export default router;