import express from "express";
import axios from "axios";
import { stat } from "fs";
import { error } from "console";

const googleRoutes = express.Router();
const APIKey = "AIzaSyDftQGUsW_B4O4ewqCW4BGH-zV1loSwkMc";

const getPlaceId = async (city: any, state: any) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
        city + " " + state
      }&types=(cities)&key=${APIKey}`
    );
    if (response.data.predictions.length > 0) {
      return response.data.predictions[0].place_id;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

const getPhotoReference = async (placeId: string) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photo&key=${APIKey}`
    );
    if (response.data.result.photos.length > 0) {
      return response.data.result.photos[0].photo_reference;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

googleRoutes.get("/cityInfo", async (req, res, next) => {
  const { city, state } = req.query;

  try {
    const placeId = await getPlaceId(city, state);
    if (placeId) {
      const photoReference = await getPhotoReference(placeId);
      res.json({ photoReference });
    } else {
      res.status(404).json({ error: "No place found" });
    }
  } catch (error) {
    next(error);
  }
});

googleRoutes.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

export default googleRoutes;
