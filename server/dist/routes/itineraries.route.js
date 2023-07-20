import { Router } from "express";
import verifyToken from "../middleware/auth.middleware.js";
import { getItinerary, createItinerary, getItineraries, deleteItinerary, updateItinerary, } from "../controllers/itinerary.controller.js";
const router = Router();
router.route("/").get(getItineraries).post(createItinerary);
router
    .route("/:postId")
    .get(verifyToken, getItinerary)
    .delete(verifyToken, deleteItinerary)
    .put(verifyToken, updateItinerary);
export default router;
//# sourceMappingURL=itineraries.route.js.map