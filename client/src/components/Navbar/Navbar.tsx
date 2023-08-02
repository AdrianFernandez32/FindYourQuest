import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import FYQH_logo from "../../assets/images/FYQ_logo_horizontal.png";
import { useNavigate } from "react-router";

type Props = {
  toggleSidebar: Function;
};

const Navbar = ({ toggleSidebar }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-14 border-b static top-0 border-gray-300 flex justify-between items-center px-3">
      <img
        src={FYQH_logo}
        alt="FYQLogo"
        className="h-2/3 md:h-3/4 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <GiHamburgerMenu
        className="cursor-pointer"
        onClick={() => toggleSidebar()}
        size="1.5em"
      />
    </div>
  );
};

export default Navbar;
