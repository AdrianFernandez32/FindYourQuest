import * as osmRead from "osm-read";
import { Graph } from "graphlib";
import * as fs from "fs";
import graphlib from "graphlib";

const graphlibJson = graphlib.json;

const graph = new Graph({ directed: false });

function haversineDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

osmRead.parse({
  filePath: "./map.xml",
  endDocument: () => {
    console.log("Grafo construido con éxito");
    const graphJson = graphlibJson.write(graph);
    fs.writeFileSync("graph.json", JSON.stringify(graphJson));
  },
  bounds: (bounds) => {
    console.log("Límites del mapa:", bounds);
  },
  node: (node) => {
    console.log("Node", node);
    graph.setNode(node.id, { lat: node.lat, lon: node.lon });
  },
  way: (way) => {
    console.log("Way", way);
    for (let i = 0; i < way.nodeRefs.length - 1; i++) {
      const node1 = graph.node(way.nodeRefs[i]);
      const node2 = graph.node(way.nodeRefs[i + 1]);
      const weight = haversineDistance(
        node1.lat,
        node1.lon,
        node2.lat,
        node2.lon
      );
      graph.setEdge(way.nodeRefs[i], way.nodeRefs[i + 1], weight);
    }
  },
  error: (msg) => {
    console.error("Error", msg);
  },
});
