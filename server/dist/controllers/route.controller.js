import * as fs from "fs";
export class PriorityQueue {
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
export class Graph {
    constructor() {
        const graphJson = JSON.parse(fs.readFileSync("/Users/adrianfersa/Documents/FindYourQuest/server/src/assets/graph.json", "utf8"));
        this.nodes = new Map();
        graphJson.nodes.forEach((node) => {
            this.addNode(node.v, node.value.lat, node.value.lon);
        });
        graphJson.edges.forEach((edge) => {
            this.addEdge(edge.v, edge.w, edge.value);
        });
    }
    addNode(key, lat, lon) {
        if (!this.nodes.has(key)) {
            this.nodes.set(key, { lat, lon, edges: new Map() });
        }
    }
    addEdge(source, target, weight) {
        if (!this.nodes.has(source) || !this.nodes.has(target))
            throw new Error("Both nodes need to exist before creating an edge");
        this.nodes.get(source).edges.set(target, weight);
        this.nodes.get(target).edges.set(source, weight);
    }
    dijkstra(source) {
        const distances = new Map();
        const previousNodes = new Map();
        const queue = new PriorityQueue();
        this.nodes.forEach((node, key) => {
            distances.set(key, key === source ? 0 : Infinity);
            previousNodes.set(key, null);
            queue.enqueue(key, distances.get(key));
        });
        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue().data;
            this.nodes.get(currentNode).edges.forEach((weight, neighbor) => {
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
            path.unshift(this.nodes.get(currentNode));
            currentNode = previousNodes.get(currentNode);
        }
        return { distance: distances.get(target), path };
    }
}
// console.log(graph.shortestPath("1454101894", "10000737542"));
//# sourceMappingURL=route.controller.js.map