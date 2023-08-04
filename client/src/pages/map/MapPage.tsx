import Layout from "../../components/Layout";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

const MapPage = () => {
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
          {/* {path.map((point, idx) => (
        <Marker position={[point.lat, point.lng]} key={idx} />
      ))} */}

          {/* Dibuja una línea entre todos los puntos de tu ruta */}
          {/* <Polyline pathOptions={{ color: "lime" }} positions={path} /> */}
        </MapContainer>
      </div>
    </Layout>
  );
};

export default MapPage;
