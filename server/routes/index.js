import express from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import chatRoutes from "./chatRouters.js";
import projectRoutes from "./projectRoutes.js";

const router = express.Router();

router.use("/user", userRoutes); //api/user/login
router.use("/task", taskRoutes);
router.use("/chat", chatRoutes);
router.use("/project", projectRoutes)// chua xong


export default router;
