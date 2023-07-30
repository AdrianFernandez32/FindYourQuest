import { RxCross2 } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import Option from "./Option";
import { AiFillHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { BiSolidPlaneAlt } from "react-icons/bi";
import tempPfp from "../../assets/images/pfp.jpg";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ILoggedUser } from "../../assets/interfaces/LoggedUser";
import { Spinner } from "@chakra-ui/react";
import { UserContext } from "../../assets/context/usercontext";
import { useContext } from "react";

type Props = {
  open: boolean;
  toggleSidebar: Function;
};

const options = [
  {
    name: "Home",
    icon: <AiFillHome size="2em" />,
    route: "/",
  },
  {
    name: "Search",
    icon: <IoMdSearch size="2em" />,
    route: "/search",
  },
  {
    name: "Plan my trip",
    icon: <BiSolidPlaneAlt size="2em" />,
    route: "/planmytrip",
  },
];

const Sidebar = ({ open, toggleSidebar }: Props) => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "useContext(UserContext) is undefined, please verify the context provider"
    );
  }

  const { user, setUser } = userContext;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setUser(null);
  };

  return (
    <div
      className={`h-screen fixed bg-white z-20 duration-75 right-0 flex justify-center items-center overflow-x-hidden sm:border-l sm:border-gray-300 ${
        open ? "w-5/6 md:w-[30%] lg:w-[23%]" : "w-0"
      }`}
    >
      <div
        className={`w-full h-full transform transition-transform duration-75 flex flex-col justify-center items-center ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <RxCross2
          className="fixed right-2 top-2 cursor-pointer"
          onClick={() => toggleSidebar()}
          size="1.50em"
          color="white"
        />
        {user ? (
          <div className="h-1/4 w-full bg-[#55ab00] flex flex-col justify-center items-center">
            <div className="flex justify-center items-center w-full gap-2 p-4">
              <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-white rounded-full overflow-hidden">
                <img
                  src={tempPfp}
                  alt="pfp"
                  className=" h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start w-8/12 justify-center ß">
                <h1 className="font-semibold text-2xl md:text-3xl text-white">
                  {user.first_name} {user.last_name}
                </h1>
                <h2 className="font-medium text-md md:text-lg text-white">
                  Trips done: {user.trips ? `${user.trips}` : "0"}
                </h2>
              </div>
            </div>
            <div className="w-11/12 border-t border-white" />
            <div className="w-full flex justify-start items-center m-2 p-5 gap-2 duration-150 text-white  hover:bg-[#376e01] cursor-pointer">
              <FaUserAlt size="1.5em" color="white" />
              <h1 className="text-xl font-semibold">Profile</h1>
            </div>
          </div>
        ) : (
          <div className="h-1/4 w-full bg-[#55ab00] flex flex-col justify-center items-center">
            <Spinner size="xl" />
            Loading user...
          </div>
        )}

        <div className="h-3/4 w-full bg-white flex flex-col justify-between items-center">
          <div className="w-full bg-transparent flex flex-col justify-center items-center">
            {options.map((options) => (
              <Option
                name={options.name}
                icon={options.icon}
                key={options.name}
                route={options.route}
              />
            ))}
          </div>
          <div
            className="w-full flex justify-start items-center border-t border-gray-300 p-5 gap-2 duration-150 text-black hover:text-white hover:bg-[#55ab00] cursor-pointer"
            onClick={() => handleLogout()}
          >
            <FiLogOut size="2em" />
            <h1 className="font-semibold text-xl">Logout</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
