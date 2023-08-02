import { useParams } from "react-router";
import Layout from "../../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import CityImage from "../citypage/components/CityImage";
import { Spinner } from "@chakra-ui/spinner";

const ItineraryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [tripInfo, setTripInfo] = useState<any>();
  const [hotel, setHotel] = useState<{
    formatted_address: string;
    name: string;
  }>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const fetchWholeTrip = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/itineraries/alltrip/${id}`
      );
      setTripInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlaceinfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/google/placeDetails?id=${tripInfo.hotel.place_id}`
      );
      setHotel(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const formattedDates = () => {
    const startTemp = new Date(tripInfo.trip.start_date);
    const start_formatted = `${startTemp.getDate()}/${
      startTemp.getMonth() + 1
    }/${startTemp.getFullYear()}`;

    const endTemp = new Date(tripInfo.trip.end_date);
    const end_formatted = `${endTemp.getDate()}/${
      endTemp.getMonth() + 1
    }/${endTemp.getFullYear()}`;

    setStartDate(start_formatted);
    setEndDate(end_formatted);
  };

  useEffect(() => {
    fetchWholeTrip();
  }, []);

  useEffect(() => {
    if (tripInfo) {
      formattedDates();
      fetchPlaceinfo();
    }
  }, [tripInfo]);

  if (!tripInfo || !hotel) {
    return (
      <Layout>
        <div className="w-full h-72 flex flex-col gap-6">
          <Spinner />
          <h1 className="text-2xl lg:text-4xl font-semibold">
            Loading your trip
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CityImage id={tripInfo.trip.city_id} type="itinerary" />
      <div className="w-full lg:w-2/3 p-6 flex justify-between items-center">
        <div
          className={`flex justify-center items-center rounded-md text-lg py-1 px-2 ${
            tripInfo.itinerary.active ? "bg-[#55ab00]" : "bg-[#ef4444]"
          } text-white font-semibold`}
        >
          {tripInfo.itinerary.active ? "Active" : "Completed"}
        </div>
        <div className="flex justify-between items-center gap-6">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-medium text-xl">Starting</h1>
            <div className="flex flex-col">{startDate}</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-medium text-xl">Ending</h1>
            <div className="flex flex-col">{endDate}</div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/3 px-6 flex flex-col items-start justify-center">
        <p className="text-2xl font-semibold">Your Hotel: </p>
        <p className="text-xl font-medium">{hotel.name}</p>
        <p className="text-lg text-gray-600">{hotel.formatted_address}</p>
      </div>
      <div className="w-full lg:w-2/3 text-2xl font-semibold p-6">
        <p>Your Itinerary</p>
        <p className="text-xs text-gray-600">
          Note: You can interact with this itinerary, but if you reload the page
          it will reset it. You cannot edit it in this page.
        </p>
      </div>
    </Layout>
  );
};

export default ItineraryPage;
