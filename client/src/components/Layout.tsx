import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import axios from "axios";

const Layout = ({ children }: any) => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full flex flex-col h-screen items-center">
      <div
        className={`fixed w-full z-10 h-full bg-black bg-opacity-50 sm:bg-opacity-0 duration-100 ${
          open ? "block sm:hidden" : "hidden"
        }`}
      />
      <Navbar toggleSidebar={toggleSidebar} />
      {children}
      <Sidebar open={open} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Layout;
