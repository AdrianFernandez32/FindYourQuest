import { Router } from "express";
import verfiyToken from "../middleware/auth.middleware.js";
import { getUsers, createUser, getUser, deleteUser, updateUser, } from "../controllers/user.controller.js";
const router = Router();
router.route("/").get(getUsers).post(createUser);
router
    .route("/:postId")
    .get(verfiyToken, getUser)
    .delete(deleteUser)
    .put(verfiyToken, updateUser);
export default router;
//# sourceMappingURL=users.routes.js.map