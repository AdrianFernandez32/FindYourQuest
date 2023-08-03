import * as fs from "fs";

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
  }

  getWeight(source, target) {
    return this.nodes.get(source).get(target);
  }
}

// Leemos el archivo JSON y creamos un grafo
const graphJson = JSON.parse(fs.readFileSync("../assets/graph.json", "utf8"));
const graph = new Graph();

// Agregamos cada nodo y cada arista al grafo
graphJson.edges.forEach((edge) => {
  graph.addNode(edge.v);
  graph.addNode(edge.w);
  graph.addEdge(edge.v, edge.w, edge.value);
});

console.log(graph.getWeight("65285181", "6960850138")); // Debería imprimir 0.012813132158421076

// import * as fs from "fs";
// import graphlibPkg from "graphlib";
// const { json: graphlibJson } = graphlibPkg;
// import Graph from "graph-data-structure";

// const graphJson = JSON.parse(fs.readFileSync("../assets/graph.json", "utf8"));
// const graphreading = graphlibJson.read(graphJson);
// console.log(graphreading.edges());

// const graph = Graph();

// graphreading.nodes().forEach((node) => {
//   graph.addNode(node);
// });

// graphreading.edges().forEach((edge) => {
//   graph.addEdge(edge.v, edge.w, edge.value);
// });

// const calculateDijkstra = (graph, startNode, endNode) => {
//   let shortestDistances = {};
//   let previousNodes = {};
//   let unvisitedNodes = graph.nodes();

//   unvisitedNodes.forEach((node) => {
//     shortestDistances[node] = Infinity;
//   });
//   shortestDistances[startNode] = 0;

//   while (unvisitedNodes.length) {
//     unvisitedNodes.sort(
//       (nodeA, nodeB) => shortestDistances[nodeA] - shortestDistances[nodeB]
//     );
//     let closestNode = unvisitedNodes.shift();

//     if (shortestDistances[closestNode] === Infinity) {
//       break;
//     }

//     graph.adjacent(closestNode).forEach((neighbor) => {
//       let distanceToNeighbor = graph.getEdgeWeight(closestNode, neighbor);
//       let totalDistance = shortestDistances[closestNode] + distanceToNeighbor;

//       if (totalDistance < shortestDistances[neighbor]) {
//         shortestDistances[neighbor] = totalDistance;
//         previousNodes[neighbor] = closestNode;
//       }
//     });
//   }

//   let path = [endNode];
//   let previousNode = previousNodes[endNode];
//   while (previousNode) {
//     path.unshift(previousNode);
//     previousNode = previousNodes[previousNode];
//   }

//   return {
//     distance: shortestDistances[endNode],
//     path: path,
//   };
// };

// const test = calculateDijkstra(graph, "31793880", "65292045");

// console.log(test);
