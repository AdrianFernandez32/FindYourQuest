import { Router } from "express";
import { PriorityQueue, Graph } from "../controllers/route.controller.js";
import * as fs from "fs";

const router = Router();

const graph = new Graph();

router.route("/:source/:target").get((req, res) => {
  const source = req.params.source;
  const target = req.params.target;
  const result = graph.shortestPath(source, target);
  res.send(result);
});

export default router;
