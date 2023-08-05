import Layout from "../../components/Layout";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/spinner";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const MapPage = () => {
  const [path, setPath] = useState<any>([]);
  const [distance, setDistance] = useState<number>(0);
  const [start, setStart] = useState<string>();
  const [end, setEnd] = useState<string>();
  const [loading, setLoading] = useState(false);

  const fetchPaths = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/shortest-path/${start}/${end}`
      );

      formatPath(response.data.path);
      setDistance(response.data.distance);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatPath = (paths: any[]) => {
    const newPaths = paths.map((element) => {
      return [element.lat, element.lon];
    });
    setPath(newPaths);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-2 my-2">
        <div className="flex justify-center items-center gap-2">
          <Input
            className="p-2 border border-gray-500 rounded-md"
            placeholder="Set starting point"
            onChange={(e) => setStart(e.target.value)}
          />
          <Input
            className="p-2 border border-gray-500 rounded-md"
            placeholder="Set ending point"
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
        <Button
          className="bg-[#55ab00] text-white border border-[#55ab00] duration-200 hover:bg-white hover:text-[#55ab00]"
          onClick={() => fetchPaths()}
        >
          Submit
        </Button>
      </div>

      <Modal isOpen={loading} onClose={() => setLoading(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            display="flex"
            justifyContent="center"
            className="flex flex-col gap-2 justify-center items-center"
          >
            <Spinner />
            <h1 className="text-2xl font-semibold">
              Loading your best route...
            </h1>
          </ModalBody>
        </ModalContent>
      </Modal>

      <div style={{ height: "90vh", width: "100%" }}>
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

          <Polyline pathOptions={{ color: "blue" }} positions={path} />
        </MapContainer>
      </div>
    </Layout>
  );
};

export default MapPage;
