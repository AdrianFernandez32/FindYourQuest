import Layout from "../../components/Layout";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/spinner";

const MapPage = () => {
  const [path, setPath] = useState<any>([]);
  const [distance, setDistance] = useState<number>(0);

  const fetchPaths = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/shortest-path/1454101894/10000737542`
      );

      formatPath(response.data.path);
      setDistance(response.data.distance);
    } catch (error) {
      console.error(error);
    }
  };

  const formatPath = (paths: any[]) => {
    const newPaths = paths.map((element) => {
      return [element.lat, element.lon];
    });
    setPath(newPaths);
  };

  useEffect(() => {
    fetchPaths();
  }, []);
  console.log(path);

  if (!path || !distance) {
    return (
      <Layout>
        <div className="w-full h-screen flex justify-center items-center gap-4">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <h1 className="lg:text-3xl text-xl font-bold">
            Loading shortest route...
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ height: "100vh", width: "100%" }}>
        <MapContainer
          center={[37.79285, -122.401795]}
          bounds={[
            [37.789, -122.40919],
            [37.7967, -122.3944],
          ]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Añade un marcador para cada punto en tu ruta */}
          {/* {path.map((point: any, idx: any) => (
            <Marker position={[point[0], point[1]]} key={idx} />
          ))} */}

          <Polyline pathOptions={{ color: "blue" }} positions={path} />
        </MapContainer>
      </div>
    </Layout>
  );
};

export default MapPage;
