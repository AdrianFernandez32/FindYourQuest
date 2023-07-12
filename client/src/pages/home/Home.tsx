import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import CurrCity from "./components/CurrCity";
import axios from "axios";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [nearbyCities, setNearbyCities] = useState([]);
  const username = "adrianfersa";

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const fetchNearbyCities = async () => {
    try {
      const position: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
          `http://localhost:3001/google/nearbyCities?latitude=${latitude}&longitude=${longitude}`
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
    <div className="w-full flex flex-col h-screen items-center">
      <div
        className={`fixed w-full h-full bg-black bg-opacity-50 sm:bg-opacity-0 duration-100 ${
          open ? "block sm:hidden" : "hidden"
        }`}
      />
      <Navbar toggleSidebar={toggleSidebar} />
      <CurrCity />
      <div className="w-full lg:w-2/3 grid grid-flow-row auto-rows-max gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {nearbyCities ? (
          <div>
            {nearbyCities.map((city) => {
              console.log(city);
              return <div></div>;
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <Sidebar open={open} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Home;
