import { BiSolidPlaneAlt, BiSolidHotel } from "react-icons/bi";
import PlanButton from "./components/PlanButton";
import Layout from "../../components/Layout";

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
    <Layout>
      <div className="w-full h-20 flex justify-center text-3xl md:text-4xl font-bold mt-8">
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
    </Layout>
  );
};

export default PlanPage;
