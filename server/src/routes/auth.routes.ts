import { Router } from "express";
import {
  authentication,
  verifyToken,
  verifyTokenLog,
} from "../controllers/auth.controller.js";
import verifyTokenlogin from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(authentication);
router.route("/verifyToken").get(verifyToken);
router.route("/verifyUser").get(verifyTokenLog);

export default router;
