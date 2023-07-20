import { Router } from "express";
import verifyToken from "../middleware/auth.middleware.js";
import {
  getHotel,
  createHotel,
  getHotels,
  deleteHotel,
  updateHotel,
} from "../controllers/hotel.controller.js";

const router = Router();

router.route("/").get(getHotels).post(createHotel);

router
  .route("/:postId")
  .get(verifyToken, getHotel)
  .delete(verifyToken, deleteHotel)
  .put(verifyToken, updateHotel);

export default router;
