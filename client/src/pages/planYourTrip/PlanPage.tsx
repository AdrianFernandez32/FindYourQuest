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
import TripForm from "./components/TripForm";

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

      <Modal isOpen={flightModal.isOpen} onClose={flightModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Flights</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button colorScheme="blue" mr={3} onClick={flightModal.onClose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={hotelModal.isOpen} onClose={hotelModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Hotel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button colorScheme="blue" mr={3} onClick={hotelModal.onClose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  );
};

export default PlanPage;
