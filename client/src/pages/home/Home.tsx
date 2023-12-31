import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import CurrCity from "./components/CurrCity";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { ICity } from "../../assets/interfaces/City";
import NearbyCityCard from "./components/NearbyCityCard";
import Layout from "../../components/Layout";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [nearbyCities, setNearbyCities] = useState<ICity[]>([]);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const getCoordinates = async () => {
    const position: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return position.coords;
  };

  const fetchNearbyCities = async () => {
    const coords = await getCoordinates();
    try {
      try {
        const response = await axios.get(
          `http://localhost:3001/google/nearbyCities?latitude=${coords.latitude}&longitude=${coords.longitude}`
        );
        if (
          response.data.nearbyCities &&
          response.data.nearbyCities.length > 0
        ) {
          setNearbyCities(response.data.nearbyCities);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNearbyCities();
  }, []);

  return (
    <Layout>
      <CurrCity getCoordinates={getCoordinates} />
      {nearbyCities.length > 0 ? (
        <div className="w-full lg:w-2/3 h-1/4">
          <h1 className="text-2xl lg:text-4xl font-bold my-2 mx-4 border-b border-gray-300">
            Cities near your
          </h1>
          <div className="w-full p-3">
            <div className="grid w-full grid-flow-row auto-rows-max gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3 md:p-0 items-center">
              {nearbyCities.map((city) => {
                return <NearbyCityCard key={city.googlePlaceId} city={city} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:w-2/3 h-1/4 flex flex-col justify-center items-center gap-4">
          <Spinner />
          <h1 className="sm:text-3xl lg:text-4xl font-bold">
            Loading nearby towns
          </h1>
        </div>
      )}
    </Layout>
  );
};

export default Home;
