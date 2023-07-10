import axios from "axios";
import React, { useEffect, useState } from "react";

const CurrCity = () => {
  const [imageURL, setImageURL] = useState("");
  const APIKey = "AIzaSyDftQGUsW_B4O4ewqCW4BGH-zV1loSwkMc";

  const fetchImage = async () => {
    try {
      const position: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${APIKey}`;
      const response = await axios.get(geocodeApiUrl);
      if (response.data.status === "OK") {
        const data = response.data;
        const city = getCity(data);
        const state = getState(data);

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
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
          city + state
        }&types=(cities)&key=${APIKey}`
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return <div className="w-full border border-black">hola</div>;
};

export default CurrCity;

// API Key AIzaSyDftQGUsW_B4O4ewqCW4BGH-zV1loSwkMc
