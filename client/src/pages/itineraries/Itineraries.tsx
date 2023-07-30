import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import ItineraryCard from "./components/ItineraryCard";
import { Spinner } from "@chakra-ui/spinner";

const Itineraries = () => {
  const [itineraries, setItineraries] = useState<any>([]);
  const fetchItineraries = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:3001/itineraries/user/11`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItineraries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  if (itineraries.length === 0) {
    return (
      <Layout>
        <Spinner m="3rem" />
        <h1 className="text-2xl lg:text-3xl font-semibold">
          Loading itineraries...
        </h1>
      </Layout>
    );
  }
  return (
    <Layout>
      <h1 className="text-2xl lg:text-4xl font-semibold m-4">
        Check out your itineraries
      </h1>
      {itineraries.map((itinerary: any) => {
        return (
          <ItineraryCard
            key={itinerary.itinerary_id}
            start_date={itinerary.start_date}
            end_date={itinerary.end_date}
            active={itinerary.active}
            place_id={itinerary.city_id}
            itinerary_id={itinerary.itinerary_id}
          />
        );
      })}
    </Layout>
  );
};

export default Itineraries;
