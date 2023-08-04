import { Router } from "express";
import { Graph } from "../controllers/route.controller.js";
const router = Router();
const graph = new Graph();
router.route("/:source/:target").get((req, res) => {
    const source = req.params.source;
    const target = req.params.target;
    const result = graph.shortestPath(source, target);
    res.send(result);
});
export default router;
//# sourceMappingURL=route.route.js.map