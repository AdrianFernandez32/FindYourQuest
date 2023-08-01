import { EventApi } from "@fullcalendar/core";
import axios from "axios";

const longActivities = new Set([
  "museum",
  "stadium",
  "zoo",
  "amusement_park",
  "campground",
]);
const midActivities = new Set([
  "art_gallery",
  "aquarium",
  "shopping_mall",
  "tourist_attraction",
  "church",
]);
const shortActivities = new Set(["movie_theater"]);

const activities = [
  "movie_theater",
  "art_gallery",
  "aquarium",
  "shopping_mall",
  "tourist_attraction",
  "church",
  "museum",
  "park",
  "stadium",
  "zoo",
  "amusement_park",
  "campground",
];

var visitedPlacesSet = new Set();

const getPlaceToVisit = async (id: string, type: string) => {
  let isVisited = true;
  while (isVisited) {
    try {
      const response = await axios.get(
        `http://localhost:3001/google/establishments?id=${id}&type=${type}`
      );

      for (const place of response.data) {
        if (!visitedPlacesSet.has(place.place_id)) {
          visitedPlacesSet.add(place.place_id);
          return place;
        }
      }
      if (type === "restaurant") {
        if (response.data.length > 0) {
          return response.data[
            Math.floor(Math.random() * response.data.length)
          ];
        } else {
          return null;
        }
      } else {
        let typeIndex = Math.floor(Math.random() * activities.length);
        type = activities[typeIndex];
      }
    } catch (error) {
      console.error(error);
    }
  }
};

const activityByHour = (hour: number) => {
  if (hour >= 0 && hour < 10) {
    return null;
  } else if (hour >= 10 && hour < 12) {
    return "restaurants";
  } else {
    return activities[Math.floor(Math.random() * activities.length)];
  }
};

const timeByActivity = (act: string) => {
  if (act in longActivities) return 4;
  else if (act in midActivities) return 3;
  else return 2;
};

const getNextStop = (currentPoint: string) => {};

export const generateItinerary = (
  events: EventApi[],
  startDate: string,
  endDate: string,
  startingPoint: string
) => {
  const currentDate = new Date(startDate);
  const end_date = new Date(endDate);
  let currentPoint = startingPoint;

  while (currentDate < end_date) {
    const currHour = currentDate.getHours();
    const act = activityByHour(currHour);
    if (!act) {
      currentPoint = startingPoint;
      currentDate.setHours(currentDate.getHours() + 1);
    } else if (act === "resturants") {
      currentDate.setMinutes(currentDate.getMinutes() + 90);
    } else {
      const timeSpent = timeByActivity(act);
      currentDate.setMinutes(currentDate.getMinutes() + timeSpent);
    }
  }
};
