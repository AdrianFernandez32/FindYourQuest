import axios from "axios";
import { constant } from "lodash";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/spinner";

interface Props {
  start_date: string;
  end_date: string | Date;
  place_id: string;
  active: boolean;
  itinerary_id: number;
}

const ItineraryCard = ({
  start_date,
  end_date,
  place_id,
  active,
  itinerary_id,
}: Props) => {
  const [image, setImage] = useState("");
  const [placeInfo, setPlace] = useState<any>(null);

  const startTemp = new Date(start_date);
  const start_formatted = `${startTemp.getDate()}/${
    startTemp.getMonth() + 1
  }/${startTemp.getFullYear()}`;

  const endTemp = new Date(end_date);
  const end_formatted = `${endTemp.getDate()}/${
    endTemp.getMonth() + 1
  }/${endTemp.getFullYear()}`;

  const fetchPlaceinfo = async () => {
    try {
      const imgResponse = await axios.get(
        `http://localhost:3001/google/cityImage?id=${place_id}`
      );
      setImage(imgResponse.data.photoReference);
      const placeResponse = await axios.get(
        `http://localhost:3001/google/placeDetails?id=${place_id}`
      );
      setPlace(placeResponse.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlaceinfo();
  }, []);

  if (!placeInfo) {
    return (
      <div className="w-2/3 h-80 rounded-lg shadow cursor-pointer hover:scale-105 flex flex-col items-center overflow-hidden justify-center">
        <Spinner />
        <h1 className="font-2xl lg:font-medium">Loading details...</h1>
      </div>
    );
  }

  return (
    <div className="w-2/3 h-96 rounded-lg shadow cursor-pointer hover:scale-105 flex flex-col duration-200 items-center overflow-hidden relative">
      <img
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference=${image}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
        alt="City Image"
        className="h-2/3 w-full object-cover"
      />
      <div className="flex w-full h-1/3 justify-between items-center p-8">
        <h1 className="text-2xl font-bold">{placeInfo.formatted_address}</h1>
        <div className="flex justify-center items-center gap-6">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-medium text-xl">Starting</h1>
            <div className="flex flex-col">{start_formatted}</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-medium text-xl">Ending</h1>
            <div className="flex flex-col">{end_formatted}</div>
          </div>
        </div>
      </div>
      <h1
        className={`${
          active ? "bg-[#10b981]" : "bg-[#ef4444]"
        } text-white text-xl px-2 font-semibold rounded-md absolute top-3 right-3`}
      >
        {active ? "Active" : "Done"}
      </h1>
    </div>
  );
};

export default ItineraryCard;
