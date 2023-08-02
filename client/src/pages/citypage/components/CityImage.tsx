import { Spinner } from "@chakra-ui/spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import defaultcity from "../../../assets/images/defaultcity.png";
import "./Components.css";

const CityImage = ({
  id,
  type,
}: {
  id: string;
  type: "city" | "itinerary";
}) => {
  const [photoReference, setphotoReference] = useState(null);
  const [city, setCity] = useState<any>(null);

  const fetchImage = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/google/cityImage?id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCityInfo = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/google/cityDetails?id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImage(id).then((image) => setphotoReference(image.photoReference));
    fetchCityInfo(id).then((info) => setCity(info));
  }, [id]);

  if (!city) {
    return (
      <div className="spinnerContainer">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <h1 className="spinnerLabel">Loading localization...</h1>
      </div>
    );
  }

  if (!photoReference) {
    return (
      <div className="imageContainer">
        <img className="imageProps" src={defaultcity} alt="Place Photo" />
        <div className="detailsDiv">
          <p className="placesIn">
            {type === "city" ? "Places in" : "See your trip in"}
          </p>
          <p className="cityName">{city.result.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="imageContainer">
      <img
        className="imageProps"
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference=${photoReference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
        alt="Place Photo"
      />
      <div className="detailsDiv">
        <p className="placesIn">
          {type === "city" ? "Places in" : "See your trip in"}
        </p>
        <p className="cityName">{city.result.name}</p>
      </div>
    </div>
  );
};

export default CityImage;
