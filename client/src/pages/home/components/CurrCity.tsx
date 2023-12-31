import axios from "axios";
import { stat } from "fs";
import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";

const CurrCity = ({ getCoordinates }: any) => {
  const [imageReference, setImageReference] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const fetchImage = async () => {
    const coords = await getCoordinates();

    try {
      const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
      const response = await axios.get(geocodeApiUrl);
      if (response.data.status === "OK") {
        const data = response.data;
        const city = getCity(data);
        setCity(city);
        const state = getState(data);
        setState(state);
        getCityInfo(city, state);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = (data: any) => {
    const results = data.results;
    for (let i = 0; i < results.length; i++) {
      const addressComponents = results[i].address_components;
      for (let j = 0; j < addressComponents.length; j++) {
        const types = addressComponents[j].types;
        if (types.includes("locality")) {
          return addressComponents[j].long_name;
        }
      }
    }
    return "";
  };

  const getState = (data: any) => {
    const results = data.results;
    for (let i = 0; i < results.length; i++) {
      const addressComponents = results[i].address_components;
      for (let j = 0; j < addressComponents.length; j++) {
        const types = addressComponents[j].types;
        if (types.includes("administrative_area_level_1")) {
          return addressComponents[j].long_name;
        }
      }
    }
    return "";
  };

  const getCityInfo = async (city: string, state: string) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/google/cityInfo",
        {
          params: {
            city: city,
            state: state,
          },
        }
      );
      setImageReference(response.data.photoReference);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  if (imageReference === "") {
    return (
      <div className="w-full lg:w-2/3 h-1/4 lg:h-[42%] flex flex-col justify-center items-center border border-gray-300">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <h1 className="font-bold sm:text-3xl lg:text-4xl mt-4">
          Loading localization...
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-2/3 h-1/4 lg:h-[42%] overflow-hidden relative">
      <img
        className="w-full h-full object-cover"
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference=${imageReference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
        alt="Place Photo"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end items-start p-4">
        <p className="text-white text-xl lg:text-3xl font-bold">You're in</p>
        <p className="text-white text-2xl lg:text-4xl font-extrabold">
          {city + ", " + state}
        </p>
      </div>
    </div>
  );
};

export default CurrCity;
