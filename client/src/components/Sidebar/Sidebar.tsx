import { RxCross2 } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import Option from "./Option";
import homeIcon from "../../assets/icons/home.png";
import searchIcon from "../../assets/icons/magnifying-glass.png";
import planMyTripIcon from "../../assets/icons/plane.png";
import profileIcon from "../../assets/icons/user.png";

type Props = {
  open: boolean;
  toggleSidebar: Function;
};

const options = [
  {
    name: "Home",
    imageURL: homeIcon,
  },
  {
    name: "Search",
    imageURL: searchIcon,
  },
  {
    name: "Plan my trip",
    imageURL: planMyTripIcon,
  },
  {
    name: "Profile",
    imageURL: profileIcon,
  },
];

const Sidebar = ({ open, toggleSidebar }: Props) => {
  return (
    <div
      className={`h-screen fixed bg-[#55ab00] duration-75 right-0 flex justify-center items-center overflow-x-hidden ${
        open ? "w-full lg:w-1/3" : "w-0"
      }`}
    >
      <div
        className={`w-full h-full transform transition-transform duration-75 flex flex-col justify-center items-center p-4 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <RxCross2
          className="fixed right-2 top-2"
          onClick={() => toggleSidebar()}
          size="1.50em"
          color="white"
        />
        <div className="w-full h-[85%] flex justify-center items-center">
          <div className="w-[90%] h-full flex flex-col justify-between">
            <div className="w-full flex justify-between flex-col h-[45%] lg:h-[40%]">
              <h1 className="text-white font-semibold text-4xl">Menu bar</h1>
              <div className="w-full flex flex-col justify-center items-center gap-4">
                {options.map((option) => (
                  <Option name={option.name} imageURL={option.imageURL} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-end">
          <div className="flex justify-center items-center p-2 bg-white rounded-lg">
            <FiLogOut size="1.5rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
