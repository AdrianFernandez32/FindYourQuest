import * as fs from "fs";

class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  enqueue(data, priority) {
    this.nodes.push({ data, priority });
    this.nodes.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.nodes.shift();
  }

  isEmpty() {
    return !this.nodes.length;
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(key) {
    if (!this.nodes.has(key)) {
      this.nodes.set(key, new Map());
    }
  }

  addEdge(source, target, weight) {
    if (!this.nodes.has(source)) this.addNode(source);
    if (!this.nodes.has(target)) this.addNode(target);

    this.nodes.get(source).set(target, weight);
    this.nodes.get(target).set(source, weight);
  }

  getWeight(source, target) {
    return this.nodes.get(source).get(target);
  }

  dijkstra(source) {
    const distances = new Map();
    const previousNodes = new Map();
    const queue = new PriorityQueue();

    this.nodes.forEach((_, key) => {
      distances.set(key, key === source ? 0 : Infinity);
      previousNodes.set(key, null);
      queue.enqueue(key, distances.get(key));
    });

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue().data;

      this.nodes.get(currentNode).forEach((weight, neighbor) => {
        const altDistance = distances.get(currentNode) + weight;

        if (altDistance < distances.get(neighbor)) {
          distances.set(neighbor, altDistance);
          previousNodes.set(neighbor, currentNode);
          queue.enqueue(neighbor, distances.get(neighbor));
        }
      });
    }

    return { distances, previousNodes };
  }

  shortestPath(source, target) {
    const { distances, previousNodes } = this.dijkstra(source);

    const path = [];
    let currentNode = target;

    while (currentNode) {
      path.unshift(currentNode);
      currentNode = previousNodes.get(currentNode);
    }

    return { distance: distances.get(target), path };
  }
}

const graphJson = JSON.parse(fs.readFileSync("../assets/graph.json", "utf8"));
const graph = new Graph();

graphJson.edges.forEach((edge) => {
  graph.addNode(edge.v);
  graph.addNode(edge.w);
  graph.addEdge(edge.v, edge.w, edge.value);
});

console.log(graph.shortestPath("1454101894", "10000737542"));
