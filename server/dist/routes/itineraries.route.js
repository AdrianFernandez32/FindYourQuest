import { Router } from "express";
import { verifyToken } from "../controllers/auth.controller.js";
import { getItinerary, createItinerary, getItineraries, deleteItinerary, updateItinerary, getItineraryByUser, } from "../controllers/itinerary.controller.js";
const router = Router();
router.route("/").get(getItineraries).post(createItinerary);
router
    .route("/post/:postId")
    .get(verifyToken, getItinerary)
    .delete(verifyToken, deleteItinerary)
    .put(verifyToken, updateItinerary);
router.route("/user/:userId").get(verifyToken, getItineraryByUser);
export default router;
//# sourceMappingURL=itineraries.route.js.map