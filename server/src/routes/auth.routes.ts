import { Router } from "express";
import { authentication } from "../controllers/auth.controller.js";

const router = Router();

router.route("/").post(authentication);

export default router;
