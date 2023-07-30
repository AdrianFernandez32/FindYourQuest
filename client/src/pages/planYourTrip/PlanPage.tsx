import { BiSolidPlaneAlt, BiSolidHotel } from "react-icons/bi";
import PlanButton from "./components/PlanButton";
import Layout from "../../components/Layout";
import Calendar from "./components/calendar/Calendar";
import { useDisclosure, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ITrip, defaultTrip } from "../../assets/interfaces/Trip";
import { IHotel, defaultHotel } from "../../assets/interfaces/Hotel";
import TripForm from "./components/TripForm";
import { IFlight, defaultFlight } from "../../assets/interfaces/Flight";
import FlightModal from "./components/FlightsModal";
import HotelModal from "./components/HotelModal";
import { EventApi } from "@fullcalendar/core";
import axios from "axios";
import { useNavigate } from "react-router";
import { formattedDate } from "../../assets/functions/FormatDate";

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
  const [events, setEvents] = useState<EventApi[] | any>([]);
  const flightModal = useDisclosure();
  const hotelModal = useDisclosure();
  const navigate = useNavigate();

  const toast = useToast();

  const updateEvents = (newEvents: EventApi[] | any) => {
    setEvents(newEvents);
  };

  const handleSubmit = () => {
    if (validateFields()) {
      Promise.all([
        axios.post(`http://localhost:3001/flights`, flightIn).catch((error) => {
          console.error("Error creating inbound flight: ", error);
        }),
        axios
          .post(`http://localhost:3001/flights`, flightOut)
          .catch((error) => {
            console.error("Error creating outbound flight: ", error);
          }),
        axios.post(`http://localhost:3001/hotels`, hotel).catch((error) => {
          console.error("Error creating hotel: ", error);
        }),
      ])
        .then((responses) => {
          const flightInResponse = responses[0];
          const flightOutResponse = responses[1];
          const hotelResponse = responses[2];

          console.log("flightInResponse:", flightInResponse?.data);
          console.log("flightOutResponse:", flightOutResponse?.data);
          console.log("hotelResponse:", hotelResponse?.data);

          if (flightInResponse && flightOutResponse && hotelResponse) {
            trip.hotel_id = hotelResponse.data.hotel.id;
            trip.flight_in_id = flightInResponse.data.flight.id;
            trip.flight_out_id = flightOutResponse.data.flight.id;
            axios
              .post(`http://localhost:3001/trips`, trip)
              .then((response) => {
                const trip_id = response.data.trip.id;
                axios
                  .post(`http://localhost:3001/itineraries`, {
                    trip_id,
                    active: true,
                    // hardcoded by now
                    user_id: 11,
                  })
                  .then((itineraryResponse) => {
                    const itinerary_id = itineraryResponse.data.itinerary.id;

                    const activities = events.map((event: any) => ({
                      name: event._def.title,
                      place_id: event._def.extendedProps.place_id,
                      start: formattedDate(event._instance.range.start),
                      end: formattedDate(event._instance.range.end),
                      itinerary_id: itinerary_id,
                    }));

                    console.log(activities);
                    return axios.post(
                      `http://localhost:3001/activities`,
                      activities
                    );
                  })
                  .then((res) => {
                    toast({
                      title: "Operación exitosa.",
                      description: "Se ha creado el itinerario completo!",
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    });
                    setTimeout(() => {
                      navigate("/");
                    }, 4000);
                  })
                  .catch((error) => {
                    console.error("Error creating itinerary: ", error);
                  });
              })
              .catch((error) => {
                console.error("Error creating trip: ", error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const validateFields = () => {
    if (flightIn == defaultFlight || flightOut === defaultFlight) {
      toast({
        title: "Error in flights",
        description: "Please fill the flights forms",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (hotel === defaultHotel) {
      toast({
        title: "Error in hotel",
        description: "Please fill correctly the hotel forms",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (trip === defaultTrip) {
      toast({
        title: "Error in trip form",
        description: "Please fill correctly the trip forms",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (events.length === 0) {
      toast({
        title: "Error in activities calendar",
        description: "Please add at least one activity",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      return true;
    }
    return false;
  };

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
      <Calendar updateEvents={updateEvents} />

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
      <Button
        className="m-5 p-2"
        colorScheme="blue"
        onClick={() => handleSubmit()}
      >
        Create itinerary
      </Button>
    </Layout>
  );
};

export default PlanPage;
