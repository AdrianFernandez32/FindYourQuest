import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import CurrCity from "./components/CurrCity/CurrCity";

const Home = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full flex flex-col h-screen border border-black items-center">
      <div
        className={`fixed w-full h-full bg-black bg-opacity-50 sm:bg-opacity-0 duration-100 ${
          open ? "block sm:hidden" : "hidden"
        }`}
      />
      <Navbar toggleSidebar={toggleSidebar} />
      <CurrCity />
      <Sidebar open={open} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Home;