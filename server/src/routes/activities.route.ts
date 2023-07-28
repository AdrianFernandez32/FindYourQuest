import { Router } from "express";
import verifyToken from "../middleware/auth.middleware.js";
import {
  getActivity,
  createActivities,
  getActivities,
  deleteActivity,
  updateActivity,
} from "../controllers/activity.controller.js";

const router = Router();

router.route("/").get(getActivities).post(createActivities);

router
  .route("/:postId")
  .get(verifyToken, getActivity)
  .delete(verifyToken, deleteActivity)
  .put(verifyToken, updateActivity);

export default router;
