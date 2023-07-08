import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className={`fixed w-full h-full bg-black bg-opacity-50 sm:bg-opacity-0 duration-100 ${
          open ? "block sm:hidden" : "hidden"
        }`}
      />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar open={open} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Home;
