// PlanPage.tsx
import { BiSolidPlaneAlt, BiSolidHotel } from "react-icons/bi";
import PlanButton from "./components/PlanButton";
import Layout from "../../components/Layout";
import Calendar from "./components/calendar/Calendar";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { ITrip, defaultTrip } from "../../assets/interfaces/Trip";
import { IHotel, defaultHotel } from "../../assets/interfaces/Hotel";
import TripForm from "./components/TripForm";
import { IFlight, defaultFlight } from "../../assets/interfaces/Flight";
import FlightModal from "./components/FlightsModal";
import HotelModal from "./components/HotelModal";

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
  const [trip, setTrip] = useState<ITrip>(defaultTrip);
  const [hotel, setHotel] = useState<IHotel>(defaultHotel);
  const [flightIn, setFlightIn] = useState<IFlight>(defaultFlight);
  const [flightOut, setFlightOut] = useState<IFlight>(defaultFlight);
  const flightModal = useDisclosure();
  const hotelModal = useDisclosure();

  return (
    <Layout>
      <div className="w-full h-20 flex justify-center text-3xl md:text-4xl font-bold m-8">
        Plan the perfect trip!
      </div>
      <div className="w-full flex justify-center items-center gap-4 md:gap-10">
        <TripForm setTrip={setTrip} />
        <div className="flex gap-4 justify-center items-center">
          {options.map((option, index) => (
            <PlanButton
              key={index}
              name={option.name}
              icon={option.icon}
              size={option.size}
              onOpen={index === 0 ? flightModal.onOpen : hotelModal.onOpen}
            />
          ))}
        </div>
      </div>
      <Calendar />

      <FlightModal
        isOpen={flightModal.isOpen}
        onClose={flightModal.onClose}
        setFlightIn={setFlightIn}
        setFlightOut={setFlightOut}
      />

      <HotelModal
        isOpen={hotelModal.isOpen}
        onClose={hotelModal.onClose}
        setHotel={setHotel}
      />
    </Layout>
  );
};

export default PlanPage;
