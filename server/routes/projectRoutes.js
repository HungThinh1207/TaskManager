import express from "express";
import { createProject,getProject,updateProject,deleteProject, getProjects } from "../controllers/projectController.js";
import { protectRoute,isAdminRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

router.post("/create-project", protectRoute,isAdminRoute, createProject);

router.get("/", protectRoute, getProjects);
router.get("/:id", protectRoute, getProject);

router.put("/update-project/:id", protectRoute,isAdminRoute, updateProject);

router.delete("/delete-project/:id", protectRoute,isAdminRoute, deleteProject);

export default router;