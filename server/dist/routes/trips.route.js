import { Router } from "express";
import verifyToken from "../middleware/auth.middleware.js";
import { getTrip, createTrip, getTrips, deleteTrip, updateTrip, } from "../controllers/trip.controller.js";
const router = Router();
router.route("/").get(getTrips).post(createTrip);
router
    .route("/:postId")
    .get(verifyToken, getTrip)
    .delete(verifyToken, deleteTrip)
    .put(verifyToken, updateTrip);
export default router;
//# sourceMappingURL=trips.route.js.map