import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import axios from "axios";

const Layout = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:3001/login/verifyToken",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="w-full flex flex-col h-screen items-center">
      <div
        className={`fixed w-full z-10 h-full bg-black bg-opacity-50 sm:bg-opacity-0 duration-100 ${
          open ? "block sm:hidden" : "hidden"
        }`}
      />
      <Navbar toggleSidebar={toggleSidebar} />
      {children}
      <Sidebar open={open} toggleSidebar={toggleSidebar} user={user} />
    </div>
  );
};

export default Layout;
