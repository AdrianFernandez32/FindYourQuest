import { Router } from "express";
import verifyToken from "../middleware/auth.middleware.js";
import { getFlight, createFlight, getFlights, deleteFlight, updateFlight, } from "../controllers/flight.controller.js";
const router = Router();
router.route("/").get(getFlights).post(createFlight);
router
    .route("/:postId")
    .get(verifyToken, getFlight)
    .delete(verifyToken, deleteFlight)
    .put(verifyToken, updateFlight);
export default router;
//# sourceMappingURL=flights.routes.js.map