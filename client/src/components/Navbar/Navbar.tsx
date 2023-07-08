import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import FYQH_logo from "../../assets/images/FYQ_logo_horizontal.png";

type Props = {
  toggleSidebar: Function;
};

const Navbar = ({ toggleSidebar }: Props) => {
  return (
    <div className="w-full h-14 border-b border-gray-300 flex justify-between items-center px-3">
      <img src={FYQH_logo} alt="FYQLogo" className="h-2/3 md:h-3/4" />
      <GiHamburgerMenu
        className="cursor-pointer"
        onClick={() => toggleSidebar()}
        size="1.5em"
      />
    </div>
  );
};

export default Navbar;
