import { Router } from "express";
import verifyToken from "../middleware/auth.middleware.js";
import { getActivity, createActivity, getActivities, deleteActivity, updateActivity, } from "../controllers/activity.controller.js";
const router = Router();
router.route("/").get(getActivities).post(createActivity);
router
    .route("/:postId")
    .get(verifyToken, getActivity)
    .delete(verifyToken, deleteActivity)
    .put(verifyToken, updateActivity);
export default router;
//# sourceMappingURL=activities.route.js.map