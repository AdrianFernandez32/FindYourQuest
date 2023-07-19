import { Router } from "express";
import { authentication, verifyToken } from "../controllers/auth.controller.js";

const router = Router();

router.route("/").post(authentication);
router.route("/verifyToken").get(verifyToken);

export default router;
