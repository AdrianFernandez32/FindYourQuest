import { BiSolidPlaneAlt, BiSolidHotel } from "react-icons/bi";
import PlanButton from "./components/PlanButton";

const options = [
  {
    name: "Add flights",
    icon: BiSolidPlaneAlt,
    size: "2.5rem",
  },
  {
    name: "Add hotel",
    icon: BiSolidHotel,
    size: "2.5rem",
  },
];

const PlanPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center p-6">
      <div className="w-full h-20 flex justify-center text-3xl md:text-4xl font-bold">
        Plan the perfect trip!
      </div>
      <div className="w-full flex justify-evenly items-center">
        {options.map((option) => (
          <PlanButton
            name={option.name}
            icon={option.icon}
            size={option.size}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanPage;
